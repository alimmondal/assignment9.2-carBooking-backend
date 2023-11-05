-- AlterTable
ALTER TABLE "super_admin" ADD COLUMN     "address" TEXT,
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "imgSrc" TEXT,
ADD COLUMN     "phone_number" TEXT,
ALTER COLUMN "role" DROP DEFAULT;
