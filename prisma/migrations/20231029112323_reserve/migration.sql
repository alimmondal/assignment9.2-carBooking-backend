/*
  Warnings:

  - You are about to drop the column `reservationDate` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "reservationDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "listing_id" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "appointment_status" SET DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
