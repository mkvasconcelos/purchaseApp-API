/*
  Warnings:

  - Changed the type of `cityId` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `code` on the `City` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_cityId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "cityId",
ADD COLUMN     "cityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_code_key" ON "City"("code");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
