import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query, ForbiddenException } from '@nestjs/common';
import { TimerService } from './timer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateTimerDto, TimerMessages } from './timer.dto';

@Controller('timer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Roles('admin', 'user')
  @Get('config')
  async getDefaultConfig(@Query('userId') userId: number) {
    const timer = await this.timerService.getDefaultConfig(userId);
    if (!timer) {
      throw new ForbiddenException(TimerMessages.FORBIDDEN_ACCESS);
    }
    return timer;
  }

  @Roles('admin', 'user')
  @Put('settings')
  async updateSettings(@Query('userId') userId: number, @Body() updateTimerDto: UpdateTimerDto) {
    const updatedTimer = await this.timerService.updateSettings(userId, updateTimerDto);
    return { message: TimerMessages.UPDATED_SUCCESS, updatedTimer };
  }

  @Roles('admin', 'user')
  @Post('complete')
  async completePomodoro(@Query('userId') userId: number, @Body() body: { taskId: number }) {
    const pomodoroInfo = await this.timerService.completePomodoro(userId, body.taskId);
    return { message: TimerMessages.COMPLETED_SUCCESS, pomodoroInfo };
  }
}
