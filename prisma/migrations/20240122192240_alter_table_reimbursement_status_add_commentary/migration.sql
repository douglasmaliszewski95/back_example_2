/*
  Warnings:

  - You are about to drop the column `commentary` on the `reimbursement` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[reimbursement] DROP COLUMN [commentary];

-- AlterTable
ALTER TABLE [dbo].[reimbursementStatus] ADD [commentary] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
