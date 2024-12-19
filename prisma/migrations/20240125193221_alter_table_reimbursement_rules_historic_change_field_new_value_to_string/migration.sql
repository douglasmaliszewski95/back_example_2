BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[reimbursementRulesHistoric] ALTER COLUMN [newValue] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
