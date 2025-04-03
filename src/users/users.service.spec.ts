import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {PrismaService} from '../prisma/prisma.service';

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
                                id: 1,
                                name: 'Test User',
                                email: 'test@example.com',
                                password: 'hashedPassword',
                                role: 'user',
                                reset_token: null,
                                reset_token_expiry: null,
                            }),
                            create: jest.fn().mockResolvedValue({
                                id: 1,
                                name: 'New User',
                                email: 'newuser@example.com',
                                password: 'hashedPassword',
                                role: 'user',
                                reset_token: null,
                                reset_token_expiry: null,
                            }),
                            update: jest.fn().mockResolvedValue({
                                id: 1,
                                name: 'Updated User',
                                email: 'updated@example.com',
                                password: 'hashedPassword',
                                role: 'user',
                                reset_token: null,
                                reset_token_expiry: null,
                            }),
                            delete: jest.fn().mockResolvedValue({
                                id: 1,
                                name: 'Deleted User',
                                email: 'deleted@example.com',
                                password: 'hashedPassword',
                                role: 'user',
                                reset_token: null,
                                reset_token_expiry: null,
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

    it('should create a user', async () => {
        const newUser = await service.create({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password',
            role: 'user',
        });

        expect(newUser.email).toBe('newuser@example.com');
    });

    it('should update a user', async () => {
        const updatedUser = await service.update(1, {name: 'Updated User'});
        expect(updatedUser.name).toBe('Updated User');
    });
});
