/*
  Warnings:

  - You are about to drop the column `emailApprover` on the `Approval` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[approverId,purchaseId]` on the table `Approval` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `approverId` to the `Approval` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Approval_emailApprover_purchaseId_key";

-- AlterTable
ALTER TABLE "Approval" DROP COLUMN "emailApprover",
ADD COLUMN     "approverId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Approval_approverId_purchaseId_key" ON "Approval"("approverId", "purchaseId");
