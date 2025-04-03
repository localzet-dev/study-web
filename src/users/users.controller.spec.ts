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
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              id: 1n,
              name: 'Test User',
              email: 'test@example.com',
              password: 'hashedPassword',
              reset_token: null,
              reset_token_expiry: null,
              tasks: jest.fn().mockReturnValue(Promise.resolve([])),
              timer: jest.fn().mockReturnValue(Promise.resolve([])),
            }),
            update: jest.fn().mockResolvedValue({
              id: 1n,
              name: 'Updated User',
              email: 'updated@example.com',
              password: 'hashedPassword',
              reset_token: null,
              reset_token_expiry: null,
              tasks: jest.fn().mockReturnValue(Promise.resolve([])),
              timer: jest.fn().mockReturnValue(Promise.resolve([])),
            }),
            remove: jest.fn().mockResolvedValue({
              id: 1n,
              name: 'Deleted User',
              email: 'deleted@example.com',
              password: 'hashedPassword',
              reset_token: null,
              reset_token_expiry: null,
              tasks: jest.fn().mockReturnValue(Promise.resolve([])),
              timer: jest.fn().mockReturnValue(Promise.resolve([])),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    const users = await controller.findAll();
    expect(users).toEqual([]);
  });

  it('should return one user by ID', async () => {
    const user = await controller.findOne('1');
    expect(user).not.toBeNull();
    expect(user!.email).toBe('test@example.com');
  });

  it('should update user data', async () => {
    const updatedUser = await controller.update('1', { name: 'Updated User' });
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should remove user by ID', async () => {
    const removedUser = await controller.remove('1');
    expect(removedUser.name).toBe('Deleted User');
  });
});
