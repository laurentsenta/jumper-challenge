import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/server';

import { env } from '../../../common/utils/envConfig';

const BACKEND_API_TOKEN = env.BACKEND_API_TOKEN;

describe('Token Balance API', () => {
  // let testClient: TestClient;
  const testAccount01 = '0x0bE1Bc34C9C420d23743ca53ED35B9238f73a950';

  it('GET /token-balance/:address - should return 401 for unauthorized users', async () => {
    const response = await request(app).get(`/token-balance/${testAccount01}`);
    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it('GET /token-balance/:address - should return 200 if you have the bearer token for the auth middleware', async () => {
    const response = await request(app)
      .get(`/token-balance/${testAccount01}`)
      .set('Authorization', `Bearer ${BACKEND_API_TOKEN}`);

    expect(response.statusCode).toEqual(StatusCodes.OK);
  });

  it('GET /token-balance/:address - should return ETH balance of 42.78', async () => {
    const response = await request(app)
      .get(`/token-balance/${testAccount01}`)
      .set('Authorization', `Bearer ${BACKEND_API_TOKEN}`);

    const result: any = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toHaveLength(1);
    expect(result.responseObject[0].contract).toEqual('0x0');
    expect(result.responseObject[0].balance).toEqual('0');
    expect(result.responseObject[0].metadata.name).toEqual('Ethereum');
    expect(result.responseObject[0].metadata.symbol).toEqual('ETH');
    expect(result.responseObject[0].metadata.decimals).toEqual(18);
  });

  it('GET /token-balance/:address - should return 400 for invalid address', async () => {
    const response = await request(app)
      .get('/token-balance/invalid-address')
      .set('Authorization', `Bearer ${BACKEND_API_TOKEN}`);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toEqual('Invalid Ethereum address format');
  });
});
