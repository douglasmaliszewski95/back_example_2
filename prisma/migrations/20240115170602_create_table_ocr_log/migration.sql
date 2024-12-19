BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementOCRLog] (
    [reimbursementOCRLogId] NVARCHAR(1000) NOT NULL,
    [reimbursementId] NVARCHAR(1000) NOT NULL,
    [OCRDate] DATETIME2,
    [OCRValue] DECIMAL(32,16),
    [OCRItens] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementOCRLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementOCRLog_pkey] PRIMARY KEY CLUSTERED ([reimbursementOCRLogId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementOCRLog] ADD CONSTRAINT [reimbursementOCRLog_reimbursementId_fkey] FOREIGN KEY ([reimbursementId]) REFERENCES [dbo].[reimbursement]([reimbursementId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
