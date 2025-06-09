import { RequestHandler, Response } from 'express';

export interface NonceService {
  getNonce(address: string): Promise<string | undefined>;
  setNonce(address: string, nonce: string): Promise<void>;
}

// TODO: make this work.
declare module 'express' {
  interface Locals {
    nonceService: NonceService;
  }
}

class InMemoryNonceService implements NonceService {
  private nonceMap: Map<string, string> = new Map();

  async getNonce(address: string): Promise<string | undefined> {
    return this.nonceMap.get(address);
  }

  async setNonce(address: string, nonce: string): Promise<void> {
    this.nonceMap.set(address, nonce);
  }
}

const nonceServiceInstance: NonceService = new InMemoryNonceService();

const nonceService: RequestHandler = (_req, res: Response, next) => {
  res.locals.nonceService = nonceServiceInstance;
  next();
};

export default nonceService;
