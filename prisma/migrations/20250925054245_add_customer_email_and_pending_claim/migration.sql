/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'PENDING_CLAIM';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "stripeId" TEXT;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "customerEmail" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_stripeId_key" ON "Course"("stripeId");
