BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[userAreas] (
    [userAreaId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [areaId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [userAreas_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [userAreas_pkey] PRIMARY KEY CLUSTERED ([userAreaId])
);

-- AddForeignKey
ALTER TABLE [dbo].[userAreas] ADD CONSTRAINT [userAreas_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[userAreas] ADD CONSTRAINT [userAreas_areaId_fkey] FOREIGN KEY ([areaId]) REFERENCES [dbo].[areas]([areaId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
