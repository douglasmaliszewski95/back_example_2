BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursement] (
    [reimbursementId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [reimbursementRulesId] NVARCHAR(1000) NOT NULL,
    [dateRequest] DATETIME2 NOT NULL,
    [commentary] NVARCHAR(1000),
    [note] NVARCHAR(1000),
    [dateExpense] DATETIME2 NOT NULL,
    [valueInvoice] DECIMAL(32,16) NOT NULL,
    [valueReimbursement] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursement_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursement_pkey] PRIMARY KEY CLUSTERED ([reimbursementId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursement] ADD CONSTRAINT [reimbursement_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursement] ADD CONSTRAINT [reimbursement_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
