import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(data: { name: string; email: string; password: string; role: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role || 'user',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }

    async update(id: number, data: Partial<{ name: string; email: string; password: string; role: string }>) {
        const user = await this.prisma.users.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return this.prisma.users.update({
            where: {id},
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }

    async remove(id: number) {
        const user = await this.prisma.users.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return this.prisma.users.delete({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }
}
