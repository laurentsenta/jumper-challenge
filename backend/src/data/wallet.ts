import { PrismaClient } from '../../generated/prisma';

export class WalletService {
  private prisma: PrismaClient;
  private static instance: WalletService;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  async updateWalletTokens(address: string, chainId: number, tokensOwned: number): Promise<void> {
    await this.prisma.wallet.upsert({
      where: {
        address_chainId: {
          address,
          chainId,
        },
      },
      update: {
        tokensOwned,
      },
      create: {
        address,
        chainId,
        tokensOwned,
      },
    });
  }

  async getLeaderboard(chainId: number, limit: number = 10): Promise<Array<{ address: string; tokensOwned: number }>> {
    return this.prisma.wallet.findMany({
      where: {
        chainId,
      },
      orderBy: {
        tokensOwned: 'desc',
      },
      take: limit,
      select: {
        address: true,
        tokensOwned: true,
      },
    });
  }

  async getWalletTokens(address: string, chainId: number): Promise<number> {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        address_chainId: {
          address,
          chainId,
        },
      },
      select: {
        tokensOwned: true,
      },
    });

    return wallet?.tokensOwned ?? 0;
  }

  async closeConnection(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export const walletService = WalletService.getInstance();
