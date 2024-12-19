/*
  Warnings:

  - You are about to drop the column `corporateDataCorporateDataId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `CorporateData` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [Users_corporateDataCorporateDataId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Users] DROP COLUMN [corporateDataCorporateDataId];

-- DropTable
DROP TABLE [dbo].[CorporateData];

-- CreateTable
CREATE TABLE [dbo].[Addresses] (
    [addressesId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [citieId] INT NOT NULL,
    [neighboarhood] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [number] NVARCHAR(1000),
    [latitude] DECIMAL(32,16),
    [longitude] DECIMAL(32,16),
    [zipCode] NVARCHAR(1000),
    [complement] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Addresses_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Addresses_pkey] PRIMARY KEY CLUSTERED ([addressesId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [Addresses_citieId_fkey] FOREIGN KEY ([citieId]) REFERENCES [dbo].[Cities]([citieId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [Addresses_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
