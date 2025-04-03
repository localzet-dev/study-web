import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({
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
              delete: jest.fn().mockResolvedValue({
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
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([]);
  });

  it('should return one user by ID', async () => {
    const user = await service.findOne(1);
    expect(user).not.toBeNull();
    expect(user!.email).toBe('test@example.com');
  });

  it('should update user data', async () => {
    const updatedUser = await service.update(1, { name: 'Updated User' });
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should remove user by ID', async () => {
    const removedUser = await service.remove(1);
    expect(removedUser.name).toBe('Deleted User');
  });
});
