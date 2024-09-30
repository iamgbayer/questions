-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "labels" TEXT[] DEFAULT ARRAY[]::TEXT[];
