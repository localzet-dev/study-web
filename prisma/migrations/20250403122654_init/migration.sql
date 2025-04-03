/*
  Warnings:

  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_user` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `pomodoros` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `timer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `timer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_user` on the `timer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_task` on the `timer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `work_interval` on the `timer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `break_interval` on the `timer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `pomodoros_completed` on the `timer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `timer` DROP FOREIGN KEY `timer_id_task_fkey`;

-- DropForeignKey
ALTER TABLE `timer` DROP FOREIGN KEY `timer_id_user_fkey`;

-- DropIndex
DROP INDEX `tasks_id_user_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `timer_id_task_fkey` ON `timer`;

-- DropIndex
DROP INDEX `timer_id_user_fkey` ON `timer`;

-- AlterTable
ALTER TABLE `tasks` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_user` INTEGER NOT NULL,
    MODIFY `pomodoros` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `timer` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_user` INTEGER NOT NULL,
    MODIFY `id_task` INTEGER NOT NULL,
    MODIFY `work_interval` INTEGER NOT NULL DEFAULT 25,
    MODIFY `break_interval` INTEGER NOT NULL DEFAULT 5,
    MODIFY `pomodoros_completed` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timer` ADD CONSTRAINT `timer_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timer` ADD CONSTRAINT `timer_id_task_fkey` FOREIGN KEY (`id_task`) REFERENCES `tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
