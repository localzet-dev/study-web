import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              role: 'user',
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Updated User',
              email: 'updated@example.com',
              role: 'admin',
            }),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should allow admin to find all users', async () => {
    const users = await controller.findAll();
    expect(users).toEqual([]);
  });

  it('should find one user by ID', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
    });

    const user = await controller.findOne(1, { userId: 1 });
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'user' });
  });

  it('should throw ForbiddenException for unauthorized access', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
    });

    await expect(controller.findOne(1, { userId: 2 })).rejects.toThrow(ForbiddenException);
  });

  it('should create a user', async () => {
    const result = await controller.create({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password',
      role: 'admin',
    });
    expect(result).toEqual({
      message: 'Пользователь успешно создан.',
      user: { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'user' },
    });
  });

  it('should update a user', async () => {
    const result = await controller.update(1, { name: 'Updated User' });
    expect(result.message).toBe('Пользователь успешно обновлён.');
  });

  it('should delete a user', async () => {
    const result = await controller.remove(1);
    expect(result.message).toBe('Пользователь успешно удалён.');
  });
});
