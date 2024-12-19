BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[incentivesFiles] (
    [incentivesFileId] NVARCHAR(1000) NOT NULL,
    [fileName] NVARCHAR(1000) NOT NULL,
    [importedAt] DATETIME2 NOT NULL,
    [user] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [incentivesFiles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [incentivesFiles_pkey] PRIMARY KEY CLUSTERED ([incentivesFileId])
);

-- CreateTable
CREATE TABLE [dbo].[incentivesLog] (
    [incentivesLogId] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [message] NVARCHAR(1000) NOT NULL,
    [incentivesFileId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [incentivesLog_pkey] PRIMARY KEY CLUSTERED ([incentivesLogId])
);

-- CreateTable
CREATE TABLE [dbo].[incentives] (
    [incentiveId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [collabId] INT NOT NULL,
    [appliedPosition] NVARCHAR(1000) NOT NULL,
    [area] NVARCHAR(1000) NOT NULL,
    [areaCoordinator] NVARCHAR(1000) NOT NULL,
    [areaLeader] NVARCHAR(1000) NOT NULL,
    [areaSupervisor] NVARCHAR(1000) NOT NULL,
    [period] NVARCHAR(1000) NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [premiumTarget] INT NOT NULL,
    [premiumAchieved] INT NOT NULL,
    [ttlTarget] NVARCHAR(1000) NOT NULL,
    [ttlTargetAchieved] NVARCHAR(1000) NOT NULL,
    [unit] NVARCHAR(1000) NOT NULL,
    [percentageGoal] DECIMAL(32,16) NOT NULL,
    [premiumSKU] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [incentivesFileId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [incentives_pkey] PRIMARY KEY CLUSTERED ([incentiveId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [incentivesLog_incentivesFileId_idx] ON [dbo].[incentivesLog]([incentivesFileId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [incentives_incentivesFileId_idx] ON [dbo].[incentives]([incentivesFileId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [incentives_userId_idx] ON [dbo].[incentives]([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[incentivesLog] ADD CONSTRAINT [incentivesLog_incentivesFileId_fkey] FOREIGN KEY ([incentivesFileId]) REFERENCES [dbo].[incentivesFiles]([incentivesFileId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[incentives] ADD CONSTRAINT [incentives_incentivesFileId_fkey] FOREIGN KEY ([incentivesFileId]) REFERENCES [dbo].[incentivesFiles]([incentivesFileId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[incentives] ADD CONSTRAINT [incentives_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
