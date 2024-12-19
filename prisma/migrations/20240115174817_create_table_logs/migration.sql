BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Logs] (
    [logId] NVARCHAR(1000) NOT NULL,
    [systemActionId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL CONSTRAINT [Logs_date_df] DEFAULT CURRENT_TIMESTAMP,
    [message] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Logs_pkey] PRIMARY KEY CLUSTERED ([logId])
);

-- CreateTable
CREATE TABLE [dbo].[SystemActions] (
    [systemActionId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [excluded] BIT NOT NULL CONSTRAINT [SystemActions_excluded_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SystemActions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [SystemActions_pkey] PRIMARY KEY CLUSTERED ([systemActionId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Logs] ADD CONSTRAINT [Logs_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Logs] ADD CONSTRAINT [Logs_systemActionId_fkey] FOREIGN KEY ([systemActionId]) REFERENCES [dbo].[SystemActions]([systemActionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
