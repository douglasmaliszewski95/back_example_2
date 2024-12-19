/*
  Warnings:

  - You are about to drop the column `functionality` on the `ProfileFunctionalities` table. All the data in the column will be lost.
  - Added the required column `functionalityId` to the `ProfileFunctionalities` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProfileFunctionalities] DROP COLUMN [functionality];
ALTER TABLE [dbo].[ProfileFunctionalities] ADD [functionalityId] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[functionalities] (
    [functionalityId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [system] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [functionalities_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [functionalities_pkey] PRIMARY KEY CLUSTERED ([functionalityId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ProfileFunctionalities_functionalityId_idx] ON [dbo].[ProfileFunctionalities]([functionalityId]);

-- AddForeignKey
ALTER TABLE [dbo].[ProfileFunctionalities] ADD CONSTRAINT [ProfileFunctionalities_functionalityId_fkey] FOREIGN KEY ([functionalityId]) REFERENCES [dbo].[functionalities]([functionalityId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
