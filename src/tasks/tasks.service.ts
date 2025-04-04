import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto, TaskMessages } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number, filter?: { status?: string; priority?: number }) {
    const where: any = { id_user: userId };
    if (filter?.status !== undefined) {
      where.status = filter.status === 'completed' ? true : false;
    }
    if (filter?.priority !== undefined) {
      where.priority = filter.priority;
    }
    return this.prisma.tasks.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true,
        created: true,
        completed: true,
        pomodoros: true,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.tasks.findUnique({
      where: { id },
      select: {
        id: true,
        id_user: true,
        title: true,
        description: true,
        priority: true,
        status: true,
        created: true,
        completed: true,
        pomodoros: true,
      },
    });
    if (!task) {
      throw new NotFoundException(TaskMessages.NOT_FOUND(id));
    }
    return task;
  }

  async create(data: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      data: {
        id_user: data.userId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: false, // задача создаётся как невыполненная
        created: new Date(),
        pomodoros: 0, // начальное количество помидоров
      },
    });
    return task;
  }

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(TaskMessages.NOT_FOUND(id));
    }

    const updatedTask = await this.prisma.tasks.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        completed: data.status ? new Date() : null, // если статус true, добавляем дату завершения
      },
    });
    return updatedTask;
  }

  async remove(id: number) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(TaskMessages.NOT_FOUND(id));
    }

    await this.prisma.tasks.delete({ where: { id } });
    return { id, message: TaskMessages.DELETED_SUCCESS };
  }
}

//Эндпоинты для задач:
// GET /tasks — получение списка задач с фильтрацией.
//
// GET /tasks/:id — получение одной задачи.
//
// POST /tasks — создание новой задачи.
//
// PUT /tasks/:id — обновление задачи.
//
// DELETE /tasks/:id — удаление задачи.