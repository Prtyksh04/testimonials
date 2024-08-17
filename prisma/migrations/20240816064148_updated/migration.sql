/*
  Warnings:

  - A unique constraint covering the columns `[spaceName]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customMessage` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headerTitle` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "customMessage" TEXT NOT NULL,
ADD COLUMN     "headerTitle" TEXT NOT NULL,
ADD COLUMN     "questions" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Space_spaceName_key" ON "Space"("spaceName");
