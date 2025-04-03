import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    jest.spyOn(service, 'register').mockResolvedValue({ token: 'jwtToken' });

    const result = await controller.register({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual({ token: 'jwtToken' });
  });

  it('should login a user', async () => {
    jest.spyOn(service, 'login').mockResolvedValue({ token: 'jwtToken' });

    const result = await controller.login({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual({ token: 'jwtToken' });
  });
});
