import { Application, RequestHandler, Response } from 'express';
import { isAddress } from 'viem';

export interface Account {
  address: string;
  token: string;
  lastSignIn: number;
}

export interface AccountService {
  getAccount(address: string): Promise<Account | null>;
  createAccount(address: string, token: string): Promise<Account>;
  updateLastSignIn(address: string, token: string): Promise<Account>;
  deleteAccount(address: string): Promise<boolean>;
}

// Extend Express types
declare module 'express' {
  interface Locals {
    accountService: AccountService;
  }
}

class InMemoryAccountService implements AccountService {
  private accounts: Map<string, Account> = new Map();

  async getAccount(address: string): Promise<Account | null> {
    if (!isAddress(address)) {
      throw new Error('Invalid Ethereum address');
    }
    return this.accounts.get(address) || null;
  }

  async createAccount(address: string, token: string): Promise<Account> {
    if (!isAddress(address)) {
      throw new Error('Invalid Ethereum address');
    }

    const account: Account = {
      address,
      token,
      lastSignIn: Date.now(),
    };

    this.accounts.set(address, account);
    return account;
  }

  async updateLastSignIn(address: string, token: string): Promise<Account> {
    if (!isAddress(address)) {
      throw new Error('Invalid Ethereum address');
    }

    const account = await this.getAccount(address);
    if (!account) {
      throw new Error('Account not found');
    }

    account.token = token;
    account.lastSignIn = Date.now();
    this.accounts.set(address, account);

    return account;
  }

  async deleteAccount(address: string): Promise<boolean> {
    return this.accounts.delete(address.toLowerCase());
  }

  // For testing purposes
  clearAccounts(): void {
    this.accounts.clear();
  }
}

const accountServiceInstance = new InMemoryAccountService();

const accountService = (app: Application): RequestHandler => {
  app.locals.accountService = accountServiceInstance;

  return (_req, res: Response, next) => {
    res.locals.accountService = app.locals.accountService;
    next();
  };
};

export default accountService;
