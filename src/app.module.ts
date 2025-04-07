import {Module} from '@nestjs/common';
import {PrismaModule} from './prisma/prisma.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TasksModule} from "./tasks/tasks.module";
import {ReportsModule} from "./reports/reports.module";
import {TimerModule} from "./timer/timer.module";

@Module({
    imports: [PrismaModule, AuthModule, ReportsModule, TasksModule, TimerModule, UsersModule],
})
export class AppModule {
}
