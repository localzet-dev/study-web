import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportMessages } from './reports.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDailyReport(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Начало дня
    const tasks = await this.prisma.tasks.findMany({
      where: {
        id_user: userId,
        completed: { gte: today },
      },
      select: {
        title: true,
        completed: true,
        pomodoros: true,
      },
    });
    if (tasks.length === 0) {
      throw new NotFoundException(ReportMessages.NO_DATA_FOUND);
    }
    return tasks;
  }

  async getWeeklyReport(userId: number) {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Неделя назад
    const tasks = await this.prisma.tasks.findMany({
      where: {
        id_user: userId,
        completed: { gte: weekAgo },
      },
      select: {
        title: true,
        completed: true,
        pomodoros: true,
      },
    });
    if (tasks.length === 0) {
      throw new NotFoundException(ReportMessages.NO_DATA_FOUND);
    }
    return tasks;
  }

  async getMonthlyReport(userId: number) {
    const today = new Date();
    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // Месяц назад
    const tasks = await this.prisma.tasks.findMany({
      where: {
        id_user: userId,
        completed: { gte: monthAgo },
      },
      select: {
        title: true,
        completed: true,
        pomodoros: true,
      },
    });
    if (tasks.length === 0) {
      throw new NotFoundException(ReportMessages.NO_DATA_FOUND);
    }
    return tasks;
  }
}

//Эндпоинты для отчётов
// GET /reports/daily — Отчёт за день (выполненные задачи, затраченные "помидоры").
//
// GET /reports/weekly — Отчёт за неделю.
//
// GET /reports/monthly — Отчёт за месяц.