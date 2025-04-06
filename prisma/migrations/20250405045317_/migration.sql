/*
  Warnings:

  - A unique constraint covering the columns `[id_task]` on the table `timer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `timer_id_task_key` ON `timer`(`id_task`);
