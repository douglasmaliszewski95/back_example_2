BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CorporateData] (
    [corporateDataId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [admissionDate] NVARCHAR(1000),
    [regionOperation] NVARCHAR(1000),
    [temporaryEmployee] BIT,
    [registration] INT NOT NULL,
    [superior] INT NOT NULL,
    [resignationDate] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CorporateData_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CorporateData_pkey] PRIMARY KEY CLUSTERED ([corporateDataId])
);

-- AddForeignKey
ALTER TABLE [dbo].[CorporateData] ADD CONSTRAINT [CorporateData_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
