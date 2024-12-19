BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[userProfiles] (
    [userProfileId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [profileId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [userProfiles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [userProfiles_pkey] PRIMARY KEY CLUSTERED ([userProfileId])
);

-- AddForeignKey
ALTER TABLE [dbo].[userProfiles] ADD CONSTRAINT [userProfiles_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[userProfiles] ADD CONSTRAINT [userProfiles_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([profileId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
