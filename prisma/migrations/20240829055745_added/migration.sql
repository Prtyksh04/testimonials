/*
  Warnings:

  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_spaceName_fkey";

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "Testimonial";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaces" (
    "id" SERIAL NOT NULL,
    "spaceName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "customMessage" TEXT NOT NULL,
    "questions" TEXT[],

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "spaceName" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL,
    "content" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "TestimonialType" NOT NULL,
    "videoUrl" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission" BOOLEAN NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_spaceName_key" ON "spaces"("spaceName");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_userId_spaceName_key" ON "spaces"("userId", "spaceName");

-- CreateIndex
CREATE INDEX "testimonials_spaceName_idx" ON "testimonials"("spaceName");

-- AddForeignKey
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_spaceName_fkey" FOREIGN KEY ("spaceName") REFERENCES "spaces"("spaceName") ON DELETE RESTRICT ON UPDATE CASCADE;
