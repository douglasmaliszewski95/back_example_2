BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[regionOperation] (
    [regionOperationId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [regionOperation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [regionOperation_pkey] PRIMARY KEY CLUSTERED ([regionOperationId])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
