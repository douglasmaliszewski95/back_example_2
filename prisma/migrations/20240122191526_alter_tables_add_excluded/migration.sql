BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[areas] ADD [excluded] BIT NOT NULL CONSTRAINT [areas_excluded_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[positions] ADD [excluded] BIT NOT NULL CONSTRAINT [positions_excluded_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[reimbursementRules] ADD [excluded] BIT NOT NULL CONSTRAINT [reimbursementRules_excluded_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
