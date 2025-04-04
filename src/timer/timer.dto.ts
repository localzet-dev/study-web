import { IsInt, IsOptional } from 'class-validator';

/**
 * DTO для изменения настроек таймера
 */
export class UpdateTimerDto {
  @IsInt()
  @IsOptional()
  work_interval?: number;

  @IsInt()
  @IsOptional()
  break_interval?: number;
}

/**
 * Тексты сообщений
 */
export const TimerMessages = {
  USER_NOT_FOUND: (userId: number) => `Пользователь с ID ${userId} не найден.`,
  TASK_NOT_FOUND: (taskId: number) => `Задача с ID ${taskId} не найдена.`,
  UPDATED_SUCCESS: 'Настройки таймера успешно обновлены.',
  COMPLETED_SUCCESS: 'Рабочий интервал успешно завершён.',
  FORBIDDEN_ACCESS: 'У вас нет доступа к этому ресурсу.',
};
