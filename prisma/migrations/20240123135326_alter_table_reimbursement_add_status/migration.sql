/*
  Warnings:

  - You are about to drop the column `name` on the `reimbursementStatus` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `reimbursementStatus` table. All the data in the column will be lost.
  - Added the required column `status` to the `reimbursement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `reimbursementStatus` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[reimbursement] ADD [status] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[reimbursementStatus] DROP COLUMN [name],
[statusId];
ALTER TABLE [dbo].[reimbursementStatus] ADD [status] NVARCHAR(1000) NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Logs_userId_idx] ON [dbo].[Logs]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Logs_systemActionId_idx] ON [dbo].[Logs]([systemActionId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
