import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/server';

describe('Auth Nonce API', () => {
  const testAccount01 = '0x0bE1Bc34C9C420d23743ca53ED35B9238f73a950';
  const testAccount02 = '0x47ce6f678E40E6D4476d66C103Ac02Bfce5EB2C1';

  beforeEach(() => {
    // TODO: inject a fresh in memory service
  });

  // TODO: at some point expire nonces.

  it('GET /account/nonce/:address - should return a message with a random value', async () => {
    const response = await request(app).get(`/account/nonce/${testAccount01}`);

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.responseObject).toEqual({
      nonce: expect.any(String),
    });
  });

  it('GET /account/nonce/:address - should return different nonce for different accounts', async () => {
    const response = await request(app).get(`/account/nonce/${testAccount01}`);
    const response2 = await request(app).get(`/account/nonce/${testAccount02}`);
    expect(response.body.responseObject.nonce).not.toEqual(response2.body.responseObject.nonce);
  });

  it('GET /account/nonce/:address - should return the same nonce for the same account', async () => {
    const response = await request(app).get(`/account/nonce/${testAccount01}`);
    const response2 = await request(app).get(`/account/nonce/${testAccount01}`);
    expect(response.body.responseObject.nonce).toEqual(response2.body.responseObject.nonce);
  });

  it('GET /account/nonce/:address - should return 400 for invalid address', async () => {
    const response = await request(app).get('/account/nonce/invalid-address');
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Invalid Ethereum address format');
  });
});
