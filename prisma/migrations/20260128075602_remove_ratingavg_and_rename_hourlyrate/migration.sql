/*
  Warnings:

  - You are about to drop the column `education` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ratingAvg` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `TutorProfile` table. All the data in the column will be lost.
  - Added the required column `price` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "education",
DROP COLUMN "hourlyRate",
DROP COLUMN "ratingAvg",
DROP COLUMN "ratingCount",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;
