-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_listId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "listId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
