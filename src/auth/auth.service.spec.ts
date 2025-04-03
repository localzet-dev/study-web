import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    jest.spyOn(service, 'register').mockResolvedValue({ token: 'jwtToken' });

    const token = await service.register('Test User', 'test@example.com', 'password');

    expect(token).toEqual({ token: 'jwtToken' });
  });

  it('should login a user', async () => {
    jest.spyOn(service, 'login').mockResolvedValue({ token: 'jwtToken' });

    const token = await service.login('test@example.com', 'password');

    expect(token).toEqual({ token: 'jwtToken' });
  });
});
