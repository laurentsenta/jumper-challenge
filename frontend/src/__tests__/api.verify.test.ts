import request from 'supertest';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
import { createSiweMessage } from 'viem/siwe';

describe('Verify API', () => {
  const API_URL = 'http://app.jumper.local:3000';
  const TEST_DOMAIN = "app.jumper.local:3000";
  const TEST_URI = "http://app.jumper.local:3000";
  
  // Test accounts with private keys
  const testAccounts = {
    account01: {
      address: '0xe448bf6730eB2F9797689837DF9661bAa7cFAADC',
      privateKey: '0x39b5c32c54de78d45f47dd2c3dd0534e1bc054de779a3bcbfa671cef50ce0aac' as `0x${string}`,
    },
    account02: {
      address: '0xA0C2eDcF64080bf58776f8D7979e31324660aB40',
      privateKey: '0xed1f395f95fa54765a1a3e6acb6d4fc83820780d0f983e8f13a674aef3218755' as `0x${string}`,
    }
  };

  const client = createWalletClient({
    chain: mainnet,
    transport: http(),
  });

  it('should verify a valid signature and message', async () => {
    // Create agent to persist cookies between requests
    const agent = request.agent(API_URL);
    
    // Get a nonce from the server
    const nonceResponse = await agent.get('/api/auth/nonce');
    const nonce = nonceResponse.text;
    
    // Create the account from private key
    const account = privateKeyToAccount(testAccounts.account01.privateKey);
    
    // Create a SIWE message
    const message = createSiweMessage({
      domain: TEST_DOMAIN,
      address: account.address,
      statement: "Sign in with Ethereum to the app.",
      uri: TEST_URI,
      version: "1",
      chainId: 1,
      nonce,
    });
    
    // Sign the message
    const signature = await client.signMessage({
      account,
      message,
    });
    
    // Send the signed message to verify
    const response = await agent
      .post('/api/auth/verify')
      .send({
        message,
        signature,
      })
      .expect(200);
    
    expect(response.body).toEqual({ ok: true });
  });

  it('should reject invalid signatures', async () => {
    // Create agent to persist cookies between requests
    const agent = request.agent(API_URL);
    
    // Get a nonce from the server
    const nonceResponse = await agent.get('/api/auth/nonce');
    const nonce = nonceResponse.text;
    
    // Create the account from private key
    const account = privateKeyToAccount(testAccounts.account01.privateKey);
    
    // Create a SIWE message
    const message = createSiweMessage({
      domain: TEST_DOMAIN,
      address: account.address,
      statement: "Sign in with Ethereum to the app.",
      uri: TEST_URI,
      version: "1",
      chainId: 1,
      nonce,
    });
    
    // Use an invalid signature
    const invalidSignature = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef00';
    
    // Send the message with invalid signature
    const response = await agent
      .post('/api/auth/verify')
      .send({
        message,
        signature: invalidSignature,
      })
      .expect(422);
    
    expect(response.body).toEqual({ message: 'Invalid signature.' });
  });

  it('should reject invalid nonce', async () => {
    // Create agent to persist cookies between requests
    const agent = request.agent(API_URL);
    
    // Create the account from private key
    const account = privateKeyToAccount(testAccounts.account01.privateKey);
    
    // Create a SIWE message with invalid nonce
    const message = createSiweMessage({
      domain: TEST_DOMAIN,
      address: account.address,
      statement: "Sign in with Ethereum to the app.",
      uri: TEST_URI,
      version: "1",
      chainId: 1,
      nonce: 'thisisaninvalidnonce',
    });
    
    // Sign the message
    const signature = await client.signMessage({
      account,
      message,
    });
    
    // Send the signed message with invalid nonce
    const response = await agent
      .post('/api/auth/verify')
      .send({
        message,
        signature,
      })
      .expect(422);
    
    expect(response.body).toEqual({ message: 'Invalid nonce.' });
  });
}); 
