import { JwtModule } from '@nestjs/jwt';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {Module} from "@nestjs/common";

@Module({
  imports: [
    JwtModule.register({
      secret: 'test-secret-key',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
