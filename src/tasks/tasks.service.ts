import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetFilteredTaskDTO } from './DTO/get-filtered-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  getFilteredTask(filterDTO: GetFilteredTaskDTO): Task[] {
    const { status, term } = filterDTO;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    if (term) {
      tasks = tasks.filter(
        (t) => t.title.includes(term) || t.description.includes(term),
      );
    }
    return Array.from(new Set(tasks));
  }

  createtTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  updateStatusById(id: string, status: TaskStatus): Task {
    var selected = this.getTaskById(id);
    selected.status = status;
    this.tasks = [...this.tasks.filter((t) => t.id !== id), selected];
    return selected;
  }
}
