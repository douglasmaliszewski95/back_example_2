BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[reimbursementRulesAreas] DROP CONSTRAINT [reimbursementRulesAreas_reimbursementRulesId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[reimbursementRulesPositions] DROP CONSTRAINT [reimbursementRulesPositions_reimbursementRulesId_fkey];

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRulesAreas_areaId_idx] ON [dbo].[reimbursementRulesAreas]([areaId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRulesPositions_positionId_idx] ON [dbo].[reimbursementRulesPositions]([positionId]);

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesPositions] ADD CONSTRAINT [reimbursementRulesPositions_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesPositions] ADD CONSTRAINT [reimbursementRulesPositions_positionId_fkey] FOREIGN KEY ([positionId]) REFERENCES [dbo].[positions]([positionId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesAreas] ADD CONSTRAINT [reimbursementRulesAreas_reimbursementRulesId_fkey] FOREIGN KEY ([reimbursementRulesId]) REFERENCES [dbo].[reimbursementRules]([reimbursementRulesId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[reimbursementRulesAreas] ADD CONSTRAINT [reimbursementRulesAreas_areaId_fkey] FOREIGN KEY ([areaId]) REFERENCES [dbo].[areas]([areaId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
