-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "searchTerm" TEXT;

-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "searchTerm" TEXT;

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "searchTerm" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "searchTerm" TEXT;
