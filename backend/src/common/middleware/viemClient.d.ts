import { PublicClient } from 'viem';

declare global {
  namespace Express {
    interface Locals {
      viem: PublicClient;
    }
  }
}

export {};
