BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementEvidence] (
    [reimbursementEvidenceId] NVARCHAR(1000) NOT NULL,
    [type] INT NOT NULL,
    [reimbursementId] NVARCHAR(1000) NOT NULL,
    [document] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementEvidence_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementEvidence_pkey] PRIMARY KEY CLUSTERED ([reimbursementEvidenceId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementEvidence] ADD CONSTRAINT [reimbursementEvidence_reimbursementId_fkey] FOREIGN KEY ([reimbursementId]) REFERENCES [dbo].[reimbursement]([reimbursementId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
