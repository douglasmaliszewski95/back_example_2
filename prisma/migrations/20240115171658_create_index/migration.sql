BEGIN TRY

BEGIN TRAN;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Addresses_citieId_idx] ON [dbo].[Addresses]([citieId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Addresses_userId_idx] ON [dbo].[Addresses]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [agencies_regionOperationId_idx] ON [dbo].[agencies]([regionOperationId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [areas_regionOperationId_idx] ON [dbo].[areas]([regionOperationId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Cities_stateId_idx] ON [dbo].[Cities]([stateId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CorporateData_userId_idx] ON [dbo].[CorporateData]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [positions_regionOperationId_idx] ON [dbo].[positions]([regionOperationId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ProfileFunctionalities_profileId_idx] ON [dbo].[ProfileFunctionalities]([profileId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Profiles_regionOperationId_idx] ON [dbo].[Profiles]([regionOperationId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursement_userId_idx] ON [dbo].[reimbursement]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursement_reimbursementRulesId_idx] ON [dbo].[reimbursement]([reimbursementRulesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementEvidence_reimbursementId_idx] ON [dbo].[reimbursementEvidence]([reimbursementId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRules_languageId_idx] ON [dbo].[reimbursementRules]([languageId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRules_regionOperationId_idx] ON [dbo].[reimbursementRules]([regionOperationId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRulesAreas_reimbursementRulesId_idx] ON [dbo].[reimbursementRulesAreas]([reimbursementRulesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRulesHistoric_reimbursementRulesId_idx] ON [dbo].[reimbursementRulesHistoric]([reimbursementRulesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRulesItens_reimbursementRulesId_idx] ON [dbo].[reimbursementRulesItens]([reimbursementRulesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementRulesPositions_reimbursementRulesId_idx] ON [dbo].[reimbursementRulesPositions]([reimbursementRulesId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementsOCRLog_reimbursementId_idx] ON [dbo].[reimbursementsOCRLog]([reimbursementId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementStatus_reimbursementId_idx] ON [dbo].[reimbursementStatus]([reimbursementId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementsValidation_reimbursementId_idx] ON [dbo].[reimbursementsValidation]([reimbursementId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reimbursementsValidation_validationsId_idx] ON [dbo].[reimbursementsValidation]([validationsId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [States_countryId_idx] ON [dbo].[States]([countryId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userAgencies_userId_idx] ON [dbo].[userAgencies]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userAgencies_agencyId_idx] ON [dbo].[userAgencies]([agencyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userAreas_userId_idx] ON [dbo].[userAreas]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userAreas_areaId_idx] ON [dbo].[userAreas]([areaId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userPositions_userId_idx] ON [dbo].[userPositions]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userPositions_positionId_idx] ON [dbo].[userPositions]([positionId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userProfiles_userId_idx] ON [dbo].[userProfiles]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [userProfiles_profileId_idx] ON [dbo].[userProfiles]([profileId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
