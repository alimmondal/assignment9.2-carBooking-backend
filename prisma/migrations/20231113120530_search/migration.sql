/*
  Warnings:

  - You are about to drop the column `searchTerm` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `searchTerm` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `searchTerm` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `searchTerm` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "searchTerm";

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "searchTerm";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "searchTerm";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "searchTerm";
