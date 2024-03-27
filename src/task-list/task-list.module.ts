import { Module } from '@nestjs/common'
import { TaskListService } from './task-list.service'
import { TaskListController } from './task-list.controller'
import { PrismaService } from 'src/prisma.service'
import { TaskModule } from 'src/task/task.module'

@Module({
	imports: [TaskModule],
	controllers: [TaskListController],
	providers: [TaskListService, PrismaService]
})
export class TaskListModule {}
