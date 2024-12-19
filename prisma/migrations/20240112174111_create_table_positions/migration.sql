BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[positions] (
    [positionId] NVARCHAR(1000) NOT NULL,
    [regionOperationId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [positions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [positions_pkey] PRIMARY KEY CLUSTERED ([positionId])
);

-- AddForeignKey
ALTER TABLE [dbo].[positions] ADD CONSTRAINT [positions_regionOperationId_fkey] FOREIGN KEY ([regionOperationId]) REFERENCES [dbo].[regionOperation]([regionOperationId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
