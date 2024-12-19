BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[userAgencies] (
    [userAgencyId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [agencyId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [userAgencies_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [userAgencies_pkey] PRIMARY KEY CLUSTERED ([userAgencyId])
);

-- AddForeignKey
ALTER TABLE [dbo].[userAgencies] ADD CONSTRAINT [userAgencies_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[userAgencies] ADD CONSTRAINT [userAgencies_agencyId_fkey] FOREIGN KEY ([agencyId]) REFERENCES [dbo].[agencies]([agenciyId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
