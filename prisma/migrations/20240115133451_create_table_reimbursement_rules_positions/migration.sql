/*
  Warnings:

  - You are about to drop the `userPostions` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[userPostions] DROP CONSTRAINT [userPostions_positionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[userPostions] DROP CONSTRAINT [userPostions_userId_fkey];

-- DropTable
DROP TABLE [dbo].[userPostions];

-- CreateTable
CREATE TABLE [dbo].[userPositions] (
    [userPositionId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [positionId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [userPositions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [userPositions_pkey] PRIMARY KEY CLUSTERED ([userPositionId])
);

-- CreateTable
CREATE TABLE [dbo].[reimbursementRulesPositions] (
    [reimbursementRulesPositionsId] NVARCHAR(1000) NOT NULL,
    [reimbursementRulesId] NVARCHAR(1000) NOT NULL,
    [positionId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementRulesPositions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementRulesPositions_pkey] PRIMARY KEY CLUSTERED ([reimbursementRulesPositionsId])
);

-- AddForeignKey
ALTER TABLE [dbo].[userPositions] ADD CONSTRAINT [userPositions_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[userPositions] ADD CONSTRAINT [userPositions_positionId_fkey] FOREIGN KEY ([positionId]) REFERENCES [dbo].[positions]([positionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesPositions] ADD CONSTRAINT [reimbursementRulesPositions_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
