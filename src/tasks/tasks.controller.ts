import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ForbiddenException,
  Req
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateTaskDto, UpdateTaskDto, TaskMessages } from './tasks.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles('admin', 'user')
  @Get()
  async findAll(@Query('userId') userId: number, @Query('status') status?: string, @Query('priority') priority?: number) {
    return this.tasksService.findAll(userId, { status, priority });
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: string, @Body() body: { userId: number }) {
    const task = await this.tasksService.findOne(parseInt(id));

    if (task.id_user !== body.userId) {
      throw new ForbiddenException(TaskMessages.FORBIDDEN_ACCESS);
    }

    return task;
  }

  @Roles('admin', 'user')
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request) {
    const task = await this.tasksService.create(createTaskDto, request.user);
    return { message: TaskMessages.CREATED_SUCCESS, task };
  }

  @Roles('admin', 'user')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.update(parseInt(id), updateTaskDto);
    return { message: TaskMessages.UPDATED_SUCCESS, task };
  }

  @Roles('admin', 'user')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(parseInt(id));
    return { message: TaskMessages.DELETED_SUCCESS };
  }
}
