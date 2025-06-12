-- CreateTable
CREATE TABLE "Wallet" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "chainId" INTEGER NOT NULL,
    "tokensOwned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_chainId_key" ON "Wallet"("address", "chainId");
