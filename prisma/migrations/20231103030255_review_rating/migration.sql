/*
  Warnings:

  - You are about to drop the column `reviewsId` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_reviewsId_fkey";

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "reviewsId",
ADD COLUMN     "comments" JSONB;

-- DropTable
DROP TABLE "reviews";
