import { TaskStatus } from '../tasks.model';
export class GetFilteredTaskDTO {
  status: TaskStatus;
  term: string;
}
