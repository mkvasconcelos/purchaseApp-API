/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `PurchaseRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "PurchaseRequest" DROP COLUMN "description";
