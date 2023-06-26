/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "PurchaseRequest" ADD COLUMN     "description" TEXT NOT NULL DEFAULT E'Teste';
