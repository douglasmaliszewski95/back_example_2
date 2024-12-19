BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Profiles] (
    [profileId] NVARCHAR(1000) NOT NULL,
    [regionOperationId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Profiles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Profiles_pkey] PRIMARY KEY CLUSTERED ([profileId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Profiles] ADD CONSTRAINT [Profiles_regionOperationId_fkey] FOREIGN KEY ([regionOperationId]) REFERENCES [dbo].[regionOperation]([regionOperationId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
