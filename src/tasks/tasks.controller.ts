import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../../dist/tasks/taks.model';
import * as request from 'supertest';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { TaskStatus } from './tasks.model';
import { GetFilteredTaskDTO } from './DTO/get-filtered-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: GetFilteredTaskDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.taskService.getFilteredTask(filterDTO);
    }
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createtTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateStatusById(id, status);
  }
}
