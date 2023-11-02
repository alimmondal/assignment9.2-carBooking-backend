/*
  Warnings:

  - You are about to drop the `reviewRatings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviewRatings" DROP CONSTRAINT "reviewRatings_listingId_fkey";

-- DropForeignKey
ALTER TABLE "reviewRatings" DROP CONSTRAINT "reviewRatings_user_id_fkey";

-- DropTable
DROP TABLE "reviewRatings";
