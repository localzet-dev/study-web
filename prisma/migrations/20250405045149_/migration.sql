-- AlterTable
ALTER TABLE `tasks` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `priority` INTEGER NOT NULL DEFAULT 1,
    MODIFY `completed` DATETIME(3) NULL;
