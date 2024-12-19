/*
  Warnings:

  - Made the column `newValue` on table `reimbursementRulesHistoric` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[reimbursementRulesHistoric] ALTER COLUMN [newValue] DECIMAL(32,16) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
