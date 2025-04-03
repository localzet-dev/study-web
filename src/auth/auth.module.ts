import {JwtModule} from '@nestjs/jwt';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'test-secret-key',
            signOptions: {expiresIn: '30d'},
        }),
    ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {
}
