/*
  Warnings:

  - You are about to drop the column `price` on the `Price` table. All the data in the column will be lost.
  - Added the required column `value` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "price",
ADD COLUMN "value" DOUBLE PRECISION;
