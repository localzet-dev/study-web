import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            // Моки методов Prisma (например, findUnique, create, ...)
            users: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    jest.spyOn(service, 'register').mockResolvedValue('jwtToken');

    const token = await controller.register({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });

    expect(token).toBe('jwtToken');
  });

  it('should login a user', async () => {
    jest.spyOn(service, 'login').mockResolvedValue('jwtToken');

    const token = await controller.login({
      email: 'test@example.com',
      password: 'password',
    });

    expect(token).toBe('jwtToken');
  });
});
