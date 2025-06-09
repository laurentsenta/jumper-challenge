import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { createTestClient, http, parseEther, publicActions, TestClient } from 'viem';
import { anvil } from 'viem/chains';

import { app } from '@/server';

describe('Token Balance API', () => {
  let testClient: TestClient;
  const testAccount01 = '0x0bE1Bc34C9C420d23743ca53ED35B9238f73a950';
  const testAccount01Balance = parseEther('42.78');

  beforeEach(() => {
    testClient = createTestClient({
      chain: anvil,
      mode: 'anvil',
      transport: http(),
    }).extend(publicActions);

    // TODO: this is a simple injection. Improve
    app.locals.viem = testClient;

    testClient.setBalance({
      address: testAccount01,
      value: testAccount01Balance,
    });
  });

  it.skip('GET /token-balance/:address - should return ETH balance of 42.78', async () => {
    const response = await request(app).get(`/token-balance/${testAccount01}`);

    const result: any = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toEqual({
      eth: testAccount01Balance.toString(),
    });
  });

  it.skip('GET /token-balance/:address - should return 400 for invalid address', async () => {
    const response = await request(app).get('/token-balance/invalid-address');

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Invalid Ethereum address format');
  });
});
