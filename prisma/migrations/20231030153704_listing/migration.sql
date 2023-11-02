/*
  Warnings:

  - You are about to drop the column `listing_id` on the `reservations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_listing_id_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "listing_id",
ADD COLUMN     "listingId" TEXT NOT NULL DEFAULT 'listing_Id';

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
