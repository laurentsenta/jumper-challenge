import request from 'supertest';

describe('Nonce API', () => {
  const API_URL = 'http://localhost:3000';

  it('should generate and return a nonce', async () => {
    const response = await request(API_URL)
      .get('/api/auth/nonce')
      .expect(200)
      .expect('Content-Type', 'text/plain');

    expect(response.text).toBeTruthy();
    expect(typeof response.text).toBe('string');
  });
}); 
