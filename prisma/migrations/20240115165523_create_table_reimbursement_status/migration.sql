BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementStatus] (
    [reimbursementStatusId] NVARCHAR(1000) NOT NULL,
    [reimbursementId] NVARCHAR(1000) NOT NULL,
    [statusId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementStatus_pkey] PRIMARY KEY CLUSTERED ([reimbursementStatusId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementStatus] ADD CONSTRAINT [reimbursementStatus_reimbursementId_fkey] FOREIGN KEY ([reimbursementId]) REFERENCES [dbo].[reimbursement]([reimbursementId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
