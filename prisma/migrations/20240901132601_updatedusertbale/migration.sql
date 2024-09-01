/*
  Warnings:

  - You are about to drop the column `userId` on the `spaces` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,spaceName]` on the table `spaces` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_userId_fkey";

-- DropIndex
DROP INDEX "spaces_userId_spaceName_key";

-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "spaces_userEmail_spaceName_key" ON "spaces"("userEmail", "spaceName");

-- AddForeignKey
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
