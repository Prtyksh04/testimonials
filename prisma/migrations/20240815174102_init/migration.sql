-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "spaceName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "starRating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Space_userId_spaceName_key" ON "Space"("userId", "spaceName");

-- CreateIndex
CREATE INDEX "Testimonial_spaceId_idx" ON "Testimonial"("spaceId");

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
