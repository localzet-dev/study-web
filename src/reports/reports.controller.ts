import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ReportMessages } from './reports.dto';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles('admin', 'user')
  @Get('daily')
  async getDailyReport(@Query('userId') userId: number) {
    const report = await this.reportsService.getDailyReport(userId);
    if (!report) {
      return { message: ReportMessages.NO_DATA_FOUND };
    }
    return report;
  }

  @Roles('admin', 'user')
  @Get('weekly')
  async getWeeklyReport(@Query('userId') userId: number) {
    const report = await this.reportsService.getWeeklyReport(userId);
    if (!report) {
      return { message: ReportMessages.NO_DATA_FOUND };
    }
    return report;
  }

  @Roles('admin', 'user')
  @Get('monthly')
  async getMonthlyReport(@Query('userId') userId: number) {
    const report = await this.reportsService.getMonthlyReport(userId);
    if (!report) {
      return { message: ReportMessages.NO_DATA_FOUND };
    }
    return report;
  }
}
