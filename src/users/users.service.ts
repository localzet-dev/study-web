import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {hash} from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async findAll() {
        return this.prisma.users.findMany({
            include: {tasks: true, timer: true},
        });
    }

    async findOne(id: number) {
        return this.prisma.users.findUnique({
            where: {id},
            include: {tasks: true, timer: true},
        });
    }

    async update(id: number, data: Partial<{ name: string; email: string; password: string }>) {
        if (data.password) {
            data.password = await hash(data.password, 10);
        }
        return this.prisma.users.update({where: {id}, data});
    }

    async remove(id: number) {
        return this.prisma.users.delete({where: {id}});
    }
}
