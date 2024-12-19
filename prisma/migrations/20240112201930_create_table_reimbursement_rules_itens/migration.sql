BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementRulesItens] (
    [reimbursementRulesItensId] NVARCHAR(1000) NOT NULL,
    [reimbursementRulesId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [value] DECIMAL(32,16),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementRulesItens_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementRulesItens_pkey] PRIMARY KEY CLUSTERED ([reimbursementRulesItensId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesItens] ADD CONSTRAINT [reimbursementRulesItens_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
