/*
  Warnings:

  - You are about to drop the `_CardToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToUser" DROP CONSTRAINT "_CardToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToUser" DROP CONSTRAINT "_CardToUser_B_fkey";

-- DropTable
DROP TABLE "_CardToUser";
