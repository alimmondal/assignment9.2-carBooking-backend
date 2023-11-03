-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "address" TEXT,
ALTER COLUMN "hashedPassword" DROP NOT NULL;

-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "reviewsId" TEXT;

-- AlterTable
ALTER TABLE "super_admin" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'super_admin',
ALTER COLUMN "hashedPassword" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashedPassword" DROP NOT NULL;

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_reviewsId_fkey" FOREIGN KEY ("reviewsId") REFERENCES "reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
