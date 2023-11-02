/*
  Warnings:

  - You are about to drop the column `category_id` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_category_id_fkey";

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "category_id",
ADD COLUMN     "category" TEXT;

-- DropTable
DROP TABLE "category";
