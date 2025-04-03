import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    const users = await controller.findAll();

    expect(users).toEqual([]);
  });

  it('should return one user by ID', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    });

    const user = await controller.findOne('1', { userId: 1 });

    expect(user).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    });
  });

  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockResolvedValue({
      id: 1,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user',
    });

    const newUser = await controller.create({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password',
      role: 'user',
    });

    expect(newUser).toEqual({
      id: 1,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user',
    });
  });

  it('should update a user', async () => {
    jest.spyOn(service, 'update').mockResolvedValue({
      id: 1,
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'user',
    });

    const updatedUser = await controller.update('1', { name: 'Updated User' });

    expect(updatedUser).toEqual({
      id: 1,
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'user',
    });
  });

  it('should remove a user by ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue({
      id: 1,
      name: 'Deleted User',
      email: 'deleted@example.com',
      role: 'user',
    });

    const removedUser = await controller.remove('1');

    expect(removedUser).toEqual({
      id: 1,
      name: 'Deleted User',
      email: 'deleted@example.com',
      role: 'user',
    });
  });
});
