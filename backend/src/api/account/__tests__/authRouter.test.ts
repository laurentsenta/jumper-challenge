import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

import { InMemoryNonceService } from '@/common/middleware/nonceService';
import { app } from '@/server';

describe('Account Authentication API', () => {
  const testAccounts = {
    account01: {
      address: '0xe448bf6730eB2F9797689837DF9661bAa7cFAADC',
      privateKey: '0x39b5c32c54de78d45f47dd2c3dd0534e1bc054de779a3bcbfa671cef50ce0aac' as `0x${string}`,
      nonce: 'test-nonce-01',
    },
    account02: {
      address: '0xA0C2eDcF64080bf58776f8D7979e31324660aB40',
      privateKey: '0xed1f395f95fa54765a1a3e6acb6d4fc83820780d0f983e8f13a674aef3218755' as `0x${string}`,
      nonce: 'test-nonce-02',
    },
    account03: {
      address: '0x6ebBeA0F0DB20e10080e5Bb4518FEEDb74d0CD0f',
      privateKey: '0x9fbc4423b5646b7822798a2f7d9751fb322da73d96c542dd805ffae8e9fe5d39' as `0x${string}`,
    },
  };

  const client = createWalletClient({
    chain: mainnet,
    transport: http(),
  });

  let originalNonceService: typeof app.locals.nonceService;
  // TODO: mock account services as well.

  beforeEach(async () => {
    // Store original service
    originalNonceService = app.locals.nonceService;

    const testService = new InMemoryNonceService();

    for (const account of Object.values(testAccounts)) {
      if ('nonce' in account) {
        await testService.setNonce(account.address, account.nonce);
      }
    }

    app.locals.nonceService = testService;
  });

  afterEach(() => {
    // Restore original service
    app.locals.nonceService = originalNonceService;
  });

  it('POST /account/ - should create account with valid signature', async () => {
    const rawAccount = testAccounts.account01;
    const account = privateKeyToAccount(rawAccount.privateKey);

    const signature = await client.signMessage({
      account,
      message: rawAccount.nonce,
    });

    const response = await request(app).post('/account/').send({
      address: account.address,
      signature,
    });

    // Verify response
    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.responseObject).toEqual({
      token: expect.any(String),
      expiresAt: expect.any(Number),
    });

    // Verify account was created
    const createdAccount = await app.locals.accountService.getAccount(account.address);
    expect(createdAccount).toBeDefined();
    expect(createdAccount?.token).toBe(response.body.responseObject.token);
    expect(createdAccount?.lastSignIn).toBeDefined();
  });

  it('POST /account/ - should return 400 for invalid signature', async () => {
    const rawAccount = testAccounts.account01;
    const account = privateKeyToAccount(rawAccount.privateKey);
    const wrongAccount = privateKeyToAccount(testAccounts.account02.privateKey);

    const signature = await client.signMessage({
      account: wrongAccount,
      message: rawAccount.nonce,
    });

    const response = await request(app).post('/account/').send({
      address: account.address,
      signature,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toContain('Invalid signature');
  });

  it('POST /account/ - should return 400 for non-existent nonce', async () => {
    const rawAccount = testAccounts.account03;
    const account = privateKeyToAccount(rawAccount.privateKey);

    const signature = await client.signMessage({
      account,
      message: testAccounts.account02.nonce,
    });

    const response = await request(app).post('/account/').send({
      address: account.address,
      signature,
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toContain('No nonce found');
  });

  it('POST /account/ - should return 400 for invalid address', async () => {
    const response = await request(app).post('/account/').send({
      address: 'invalid-address',
      signature: '0x123',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toContain('Invalid Ethereum address');
  });
});
