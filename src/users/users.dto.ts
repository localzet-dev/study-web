import { IsEmail, IsOptional, IsString, IsInt } from 'class-validator';

/**
 * DTO для создания пользователя
 */
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}

/**
 * DTO для обновления пользователя
 */
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;
}

/**
 * Тексты сообщений
 */
export const UserMessages = {
  NOT_FOUND: (id: number) => `Пользователь с ID ${id} не найден.`,
  CREATED_SUCCESS: 'Пользователь успешно создан.',
  UPDATED_SUCCESS: 'Пользователь успешно обновлён.',
  DELETED_SUCCESS: 'Пользователь успешно удалён.',
  FORBIDDEN_ACCESS: 'У вас нет доступа к этому ресурсу.',
};
