/*
  Warnings:

  - You are about to drop the column `currency` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "currency",
DROP COLUMN "image",
DROP COLUMN "title";
