import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {UpdateTimerDto, TimerMessages} from './timer.dto';

@Injectable()
export class TimerService {
    constructor(private readonly prisma: PrismaService) {
    }

    async getDefaultConfig(userId: number) {
        const user = await this.prisma.users.findUnique({where: {id: userId}});
        if (!user) {
            throw new NotFoundException(TimerMessages.USER_NOT_FOUND(userId));
        }
        return {
            work_interval: 25,
            break_interval: 5,
        };
    }

    async updateSettings(userId: number, data: UpdateTimerDto) {
        const user = await this.prisma.users.findUnique({where: {id: userId}});
        if (!user) {
            throw new NotFoundException(TimerMessages.USER_NOT_FOUND(userId));
        }
        return {
            work_interval: data.work_interval || 25,
            break_interval: data.break_interval || 5,
        };
    }

    async completePomodoro(userId: number, taskId: number) {
        const task = await this.prisma.tasks.findUnique({
            where: {id: taskId},
            include: {user: true}
        });
        if (!task) {
            throw new NotFoundException(TimerMessages.TASK_NOT_FOUND(taskId));
        }

        const updatedPomodoros = await this.prisma.timer.update({
            where: {id_task: taskId},
            data: {pomodoros_completed: {increment: 1}},
        });

        return updatedPomodoros;
    }
}

//Эндпоинты для таймера:
// GET /timer/config — Получение стандартных настроек таймера (рабочий и перерывной интервал).
//
// PUT /timer/settings — Обновление пользовательских настроек таймера (например, изменение длительности интервалов).
//
// POST /timer/complete — Завершение одного "помидора" для задачи (увеличение pomodoros_completed).