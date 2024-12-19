BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Profiles] ADD [excluded] BIT NOT NULL CONSTRAINT [Profiles_excluded_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH