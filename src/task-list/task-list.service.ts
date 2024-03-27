import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnTaskListObject } from './return-task-list.object'
import { TaskListDto } from './task-list.dto'
import { TaskService } from 'src/task/task.service'

@Injectable()
export class TaskListService {
	constructor(
		private prisma: PrismaService,
		private taskService: TaskService
	) {}

	async getAll() {
		return this.prisma.taskList.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnTaskListObject
		})
	}

	async getById(taskId: number) {
		return this.prisma.taskList.findUnique({
			where: { id: taskId }
		})
	}

	async create(dto: TaskListDto) {
		return this.prisma.taskList.create({
			data: {
				name: dto.name
			}
		})
	}

	async update(taskListId: number, dto: TaskListDto) {
		const taskList = await this.prisma.taskList.findUnique({
			where: { id: taskListId }
		})

		if (taskList) throw new NotFoundException('Task list not found')

		return this.prisma.taskList.update({
			where: { id: taskListId },
			data: {
				name: dto.name
			}
		})
	}

	async delete(taskListId: number) {
		const taskList = await this.prisma.taskList.findUnique({
			where: { id: taskListId }
		})

		if (taskList) throw new NotFoundException('Task list not found')

		return this.prisma.taskList.delete({
			where: {
				id: taskListId
			}
		})
	}
}
