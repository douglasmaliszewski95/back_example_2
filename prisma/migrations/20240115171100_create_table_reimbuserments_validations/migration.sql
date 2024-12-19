BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementsValidation] (
    [reimbursementsValidationId] NVARCHAR(1000) NOT NULL,
    [reimbursementId] NVARCHAR(1000) NOT NULL,
    [validationsId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementsValidation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementsValidation_pkey] PRIMARY KEY CLUSTERED ([reimbursementsValidationId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementsValidation] ADD CONSTRAINT [reimbursementsValidation_reimbursementId_fkey] FOREIGN KEY ([reimbursementId]) REFERENCES [dbo].[reimbursement]([reimbursementId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementsValidation] ADD CONSTRAINT [reimbursementsValidation_validationsId_fkey] FOREIGN KEY ([validationsId]) REFERENCES [dbo].[validations]([validationsId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
