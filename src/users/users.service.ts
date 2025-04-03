import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateUserDto, UpdateUserDto, UserMessages} from './users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAll() {
        return this.prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.users.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        if (!user) {
            throw new NotFoundException(UserMessages.NOT_FOUND(id));
        }
        return user;
    }

    async create(data: CreateUserDto) {
        const user = await this.prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role || 'user',
            },
        });
        return user;
    }

    async update(id: number, data: UpdateUserDto) {
        const user = await this.prisma.users.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(UserMessages.NOT_FOUND(id));
        }

        const updatedUser = await this.prisma.users.update({
            where: {id},
            data,
        });
        return updatedUser;
    }

    async remove(id: number) {
        const user = await this.prisma.users.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(UserMessages.NOT_FOUND(id));
        }

        await this.prisma.users.delete({where: {id}});
        return {id, message: UserMessages.DELETED_SUCCESS};
    }
}
