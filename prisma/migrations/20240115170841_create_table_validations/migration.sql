/*
  Warnings:

  - You are about to drop the `reimbursementOCRLog` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[reimbursementOCRLog] DROP CONSTRAINT [reimbursementOCRLog_reimbursementId_fkey];

-- DropTable
DROP TABLE [dbo].[reimbursementOCRLog];

-- CreateTable
CREATE TABLE [dbo].[reimbursementsOCRLog] (
    [reimbursementOCRLogId] NVARCHAR(1000) NOT NULL,
    [reimbursementId] NVARCHAR(1000) NOT NULL,
    [OCRDate] DATETIME2,
    [OCRValue] DECIMAL(32,16),
    [OCRItens] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementsOCRLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementsOCRLog_pkey] PRIMARY KEY CLUSTERED ([reimbursementOCRLogId])
);

-- CreateTable
CREATE TABLE [dbo].[validations] (
    [validationsId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [validations_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [validations_pkey] PRIMARY KEY CLUSTERED ([validationsId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementsOCRLog] ADD CONSTRAINT [reimbursementsOCRLog_reimbursementId_fkey] FOREIGN KEY ([reimbursementId]) REFERENCES [dbo].[reimbursement]([reimbursementId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
