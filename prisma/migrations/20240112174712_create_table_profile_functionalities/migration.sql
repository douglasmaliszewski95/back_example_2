BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ProfileFunctionalities] (
    [profileFunctionalityId] NVARCHAR(1000) NOT NULL,
    [profileId] NVARCHAR(1000) NOT NULL,
    [functionality] NVARCHAR(1000) NOT NULL,
    [enable] BIT NOT NULL,
    [preview] BIT NOT NULL,
    [maintenance] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProfileFunctionalities_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ProfileFunctionalities_pkey] PRIMARY KEY CLUSTERED ([profileFunctionalityId])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProfileFunctionalities] ADD CONSTRAINT [ProfileFunctionalities_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([profileId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
