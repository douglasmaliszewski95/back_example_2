/*
  Warnings:

  - You are about to drop the column `date` on the `reimbursementRulesHistoric` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[reimbursementRulesHistoric] DROP COLUMN [date];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
