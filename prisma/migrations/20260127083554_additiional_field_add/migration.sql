-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT DEFAULT 'Student',
ADD COLUMN     "status" TEXT DEFAULT 'Unbanned';
