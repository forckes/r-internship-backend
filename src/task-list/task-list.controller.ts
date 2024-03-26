import { Controller } from '@nestjs/common';
import { TaskListService } from './task-list.service';

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}
}
