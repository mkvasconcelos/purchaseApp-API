/*
  Warnings:

  - The values [Reported] on the enum `PurchaseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PurchaseStatus_new" AS ENUM ('Sent', 'Approved', 'Rejected');
ALTER TABLE "PurchaseRequest" ALTER COLUMN "status" TYPE "PurchaseStatus_new" USING ("status"::text::"PurchaseStatus_new");
ALTER TYPE "PurchaseStatus" RENAME TO "PurchaseStatus_old";
ALTER TYPE "PurchaseStatus_new" RENAME TO "PurchaseStatus";
DROP TYPE "PurchaseStatus_old";
COMMIT;
