import { Application, RequestHandler, Response } from 'express';

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

export class InMemoryNonceService implements NonceService {
  private nonceMap: Map<string, string> = new Map();

  async getNonce(address: string): Promise<string | undefined> {
    return this.nonceMap.get(address);
  }

  async setNonce(address: string, nonce: string): Promise<void> {
    this.nonceMap.set(address, nonce);
  }
}

const nonceServiceInstance: NonceService = new InMemoryNonceService();

const nonceService = (app: Application): RequestHandler => {
  app.locals.nonceService = nonceServiceInstance;

  // TODO: better injection, this is a hack.
  return (_req, res: Response, next) => {
    res.locals.nonceService = app.locals.nonceService;
    next();
  };
};

export default nonceService;
