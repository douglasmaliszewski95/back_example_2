BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[reimbursementRulesAreas] (
    [reimbursementRulesAreasId] NVARCHAR(1000) NOT NULL,
    [reimbursementRulesId] NVARCHAR(1000) NOT NULL,
    [areaId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reimbursementRulesAreas_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [reimbursementRulesAreas_pkey] PRIMARY KEY CLUSTERED ([reimbursementRulesAreasId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesAreas] ADD CONSTRAINT [reimbursementRulesAreas_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
