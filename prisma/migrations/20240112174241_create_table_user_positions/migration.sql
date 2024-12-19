BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[userPostions] (
    [userPositionId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [positionId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [userPostions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [userPostions_pkey] PRIMARY KEY CLUSTERED ([userPositionId])
);

-- AddForeignKey
ALTER TABLE [dbo].[userPostions] ADD CONSTRAINT [userPostions_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[userPostions] ADD CONSTRAINT [userPostions_positionId_fkey] FOREIGN KEY ([positionId]) REFERENCES [dbo].[positions]([positionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
