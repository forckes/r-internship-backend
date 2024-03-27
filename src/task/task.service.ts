import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnTaskObject } from './return-task-list.object'
import { TaskUpdateDto } from './dto/task.update.dto'
import { TaskDto } from './dto/task.dto'
import { ITask } from './task.interface'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number): Promise<ITask[]> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.task.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			},
			select: returnTaskObject
		})
	}

	async getById(userId: number, taskId: number): Promise<ITask> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.task.findUnique({
			where: { userId, id: taskId }
		})
	}

	async create(userId: number, dto: TaskDto): Promise<ITask> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const isSameName = await this.prisma.task.findFirst({
			where: { userId, name: dto.name }
		})

		if (isSameName) {
			throw new BadRequestException('Task with the same name already exists')
		}

		const { name, description, dueDate, taskListId, priority, status } = dto

		return this.prisma.task.create({
			data: {
				name,
				description,
				dueDate,
				taskList: {
					connect: {
						id: taskListId
					}
				},
				priority,
				status,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(
		userId: number,
		taskId: number,
		dto: TaskUpdateDto
	): Promise<ITask> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const isSameName = await this.prisma.task.findFirst({
			where: { userId, name: dto.name }
		})

		if (isSameName) {
			throw new BadRequestException('Task with the same name already exists')
		}

		const { name, description, dueDate, taskListId, priority, status } = dto

		const task = await this.prisma.task.findUnique({
			where: { userId, id: taskId }
		})

		if (!task) throw new NotFoundException('Task not found')

		return this.prisma.task.update({
			where: { id: taskId },
			data: {
				name,
				description,
				dueDate,
				taskList: {
					connect: {
						id: taskListId
					}
				},
				priority,
				status
			}
		})
	}

	async delete(userId: number, taskId: number): Promise<ITask> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const task = await this.prisma.task.findUnique({
			where: { userId, id: taskId }
		})

		if (!task) throw new NotFoundException('Task not found')

		return this.prisma.task.delete({
			where: {
				id: taskId
			}
		})
	}

	async adminDelete(userId: number, taskId: number): Promise<ITask> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const task = await this.prisma.task.findUnique({
			where: { id: taskId }
		})

		if (!task) throw new NotFoundException('Task not found')

		return this.prisma.task.delete({
			where: {
				id: taskId
			}
		})
	}
}
