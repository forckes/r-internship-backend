import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnTaskObject } from './return-task-list.object'
import { TaskUpdateDto } from './dto/task.update.dto'
import { TaskDto } from './dto/task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.task.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnTaskObject
		})
	}

	async getById(taskId: number) {
		return this.prisma.task.findUnique({
			where: { id: taskId }
		})
	}

	async create(dto: TaskDto) {
		const { name, description, dueDate, taskListId, priority, status } = dto

		return this.prisma.task.create({
			data: {
				name,
				description,
				dueDate,
				taskListId,
				priority,
				status
			}
		})
	}

	async update(taskId: number, dto: TaskUpdateDto) {
		const { name, description, dueDate, taskListId, priority, status } = dto

		const task = await this.prisma.task.findUnique({
			where: { id: taskId }
		})

		if (task) throw new NotFoundException('Task not found')

		return this.prisma.task.update({
			where: { id: taskId },
			data: {
				name,
				description,
				dueDate,
				taskListId,
				priority,
				status
			}
		})
	}

	async delete(id: number) {
		return this.prisma.task.delete({
			where: {
				id
			}
		})
	}
}
