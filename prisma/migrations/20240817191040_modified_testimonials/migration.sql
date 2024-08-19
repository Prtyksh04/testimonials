/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `spaceName` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_spaceId_fkey";

-- DropIndex
DROP INDEX "Testimonial_spaceId_idx";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "spaceId",
ADD COLUMN     "spaceName" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Testimonial_spaceName_idx" ON "Testimonial"("spaceName");

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_spaceName_fkey" FOREIGN KEY ("spaceName") REFERENCES "Space"("spaceName") ON DELETE RESTRICT ON UPDATE CASCADE;
