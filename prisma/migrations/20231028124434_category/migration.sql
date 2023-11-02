/*
  Warnings:

  - You are about to drop the column `categoryId` on the `listings` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_categoryId_fkey";

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
