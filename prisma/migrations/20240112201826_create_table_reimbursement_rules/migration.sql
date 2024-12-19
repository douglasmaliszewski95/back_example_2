BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementRules] (
    [reimbursementRulesId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [valueLimit] DECIMAL(32,16),
    [beginDate] DATETIME2 NOT NULL,
    [rules] NVARCHAR(1000) NOT NULL,
    [regionOperationId] NVARCHAR(1000) NOT NULL,
    [languageId] NVARCHAR(1000) NOT NULL,
    [icon] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementRules_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementRules_pkey] PRIMARY KEY CLUSTERED ([reimbursementRulesId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRules] ADD CONSTRAINT [reimbursementRules_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[language]([languageId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRules] ADD CONSTRAINT [reimbursementRules_regionOperationId_fkey] FOREIGN KEY ([regionOperationId]) REFERENCES [dbo].[regionOperation]([regionOperationId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
