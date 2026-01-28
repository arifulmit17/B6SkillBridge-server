/*
  Warnings:

  - You are about to drop the column `endTime` on the `AvailabilitySlot` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `AvailabilitySlot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AvailabilitySlot" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ALTER COLUMN "dayOfWeek" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "rating" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TutorProfile" ALTER COLUMN "price" SET DATA TYPE TEXT;
