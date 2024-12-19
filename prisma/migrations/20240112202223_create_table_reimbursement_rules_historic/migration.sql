BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementRulesHistoric] (
    [reimbursementRulesHistoricId] NVARCHAR(1000) NOT NULL,
    [reimbursementRulesId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [newValue] DECIMAL(32,16),
    [date] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementRulesHistoric_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementRulesHistoric_pkey] PRIMARY KEY CLUSTERED ([reimbursementRulesHistoricId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesHistoric] ADD CONSTRAINT [reimbursementRulesHistoric_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
