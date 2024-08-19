/*
  Warnings:

  - Added the required column `type` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestimonialType" AS ENUM ('TEXT', 'VIDEO');

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "type" "TestimonialType" NOT NULL;
