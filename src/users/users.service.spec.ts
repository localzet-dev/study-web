import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

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
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
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
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue({
      id: 1n,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    });

    const user = await service.findOne(1);
    expect(user).not.toBeNull();
    expect(user!.email).toBe('test@example.com');
  });

  it('should create a user', async () => {
    jest.spyOn(prisma.users, 'create').mockResolvedValue({
      id: 1n,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user',
    });

    const newUser = await service.create({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password',
      role: 'user',
    });

    expect(newUser).toEqual({
      id: 1n,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user',
    });
  });

  it('should update a user', async () => {
    jest.spyOn(prisma.users, 'update').mockResolvedValue({
      id: 1n,
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'user',
    });

    const updatedUser = await service.update(1, { name: 'Updated User' });
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should remove a user by ID', async () => {
    jest.spyOn(prisma.users, 'delete').mockResolvedValue({
      id: 1n,
      name: 'Deleted User',
      email: 'deleted@example.com',
      role: 'user',
    });

    const removedUser = await service.remove(1);
    expect(removedUser.name).toBe('Deleted User');
  });
});
