BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CorporateData] (
    [corporateDataId] NVARCHAR(1000) NOT NULL,
    [agency] INT NOT NULL,
    [area] NVARCHAR(1000),
    [admissionDate] NVARCHAR(1000),
    [regionOperation] NVARCHAR(1000),
    [temporaryEmployee] BIT,
    [registration] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CorporateData_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CorporateData_pkey] PRIMARY KEY CLUSTERED ([corporateDataId])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [userId] NVARCHAR(1000) NOT NULL,
    [collaboratorId] INT,
    [name] NVARCHAR(1000) NOT NULL,
    [userGroupName] NVARCHAR(1000),
    [login] NVARCHAR(1000) NOT NULL,
    [nationalIdCard2] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [enabled] BIT NOT NULL CONSTRAINT [Users_enabled_df] DEFAULT 0,
    [userUpdatedAt] NVARCHAR(1000),
    [userUpdatedAtMillis] INT,
    [fieldTeam] BIT,
    [excluded] BIT NOT NULL CONSTRAINT [Users_excluded_df] DEFAULT 0,
    [birthDate] DATETIME2 NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [updatedPassword] NVARCHAR(1000) NOT NULL,
    [acceptedTerms] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [corporateDataCorporateDataId] NVARCHAR(1000),
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_corporateDataCorporateDataId_fkey] FOREIGN KEY ([corporateDataCorporateDataId]) REFERENCES [dbo].[CorporateData]([corporateDataId]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
