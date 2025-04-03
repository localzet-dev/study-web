import {Injectable, UnauthorizedException, BadRequestException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {
    }

    async register(name: string, email: string, password: string) {
        const existingUser = await this.prisma.users.findUnique({where: {email}});
        if (existingUser) {
            throw new BadRequestException('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.users.create({
            data: {name, email, password: hashedPassword},
        });
        return {token: this.jwtService.sign({id: user.id, name: user.name})};
    }

    async login(email: string, password: string) {
        const user = await this.prisma.users.findUnique({where: {email}});
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            token: this.jwtService.sign({id: user.id, name: user.name, role: user.role}),
        };
    }
}
