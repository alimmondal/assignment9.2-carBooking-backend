/*
  Warnings:

  - You are about to drop the column `patient_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `available_doctor_id` on the `available_services` table. All the data in the column will be lost.
  - You are about to drop the column `specialization_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the `available_doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specializations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slot_id,service_id,slot_date]` on the table `available_services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "available_doctors" DROP CONSTRAINT "available_doctors_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "available_doctors" DROP CONSTRAINT "available_doctors_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "available_services" DROP CONSTRAINT "available_services_available_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_specialization_id_fkey";

-- DropForeignKey
ALTER TABLE "medical_history" DROP CONSTRAINT "medical_history_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_specialization_id_fkey";

-- DropIndex
DROP INDEX "available_services_slot_id_service_id_slot_date_available_d_key";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "patient_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "available_services" DROP COLUMN "available_doctor_id";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "specialization_id";

-- DropTable
DROP TABLE "available_doctors";

-- DropTable
DROP TABLE "doctors";

-- DropTable
DROP TABLE "medical_history";

-- DropTable
DROP TABLE "patients";

-- DropTable
DROP TABLE "specializations";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviewRating" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reviewRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "available_services_slot_id_service_id_slot_date_key" ON "available_services"("slot_id", "service_id", "slot_date");

-- AddForeignKey
ALTER TABLE "reviewRating" ADD CONSTRAINT "reviewRating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
