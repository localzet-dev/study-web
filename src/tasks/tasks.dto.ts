import {IsOptional, IsString, IsInt, IsBoolean} from 'class-validator';

/**
 * DTO для создания задачи
 */
export class CreateTaskDto {
    @IsOptional()
    @IsInt()
    userId?: number;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    priority?: number;
}

/**
 * DTO для обновления задачи
 */
export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    priority?: number;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
}

/**
 * Тексты сообщений
 */
export const TaskMessages = {
    NOT_FOUND: (id: number) => `Задача с ID ${id} не найдена.`,
    CREATED_SUCCESS: 'Задача успешно создана.',
    UPDATED_SUCCESS: 'Задача успешно обновлена.',
    DELETED_SUCCESS: 'Задача успешно удалена.',
    FORBIDDEN_ACCESS: 'У вас нет доступа к этой задаче.',
};
