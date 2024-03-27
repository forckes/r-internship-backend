import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnTaskListObject } from './return-task-list.object'
import { TaskListDto } from './task-list.dto'
import { TaskService } from 'src/task/task.service'
import { ITaskList } from './task-list.interface'

@Injectable()
export class TaskListService {
	constructor(
		private prisma: PrismaService,
		private taskService: TaskService
	) {}

	async getAll(userId: number): Promise<ITaskList[]> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.taskList.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			},
			select: returnTaskListObject
		})
	}

	async getById(userId: number, taskListId: number): Promise<ITaskList> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.taskList.findUnique({
			where: { userId, id: taskListId }
		})
	}

	async create(userId: number, dto: TaskListDto): Promise<ITaskList> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const isSameNameList = await this.prisma.taskList.findFirst({
			where: { userId, name: dto.name }
		})

		if (isSameNameList) {
			throw new BadRequestException(
				'Task list with the same name already exists'
			)
		}

		return this.prisma.taskList.create({
			data: {
				name: dto.name
			}
		})
	}

	async update(
		userId: number,
		taskListId: number,
		dto: TaskListDto
	): Promise<ITaskList> {
		const taskList = await this.prisma.taskList.findUnique({
			where: { id: taskListId }
		})

		if (taskList) throw new NotFoundException('Task list not found')

		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const isSameNameList = await this.prisma.taskList.findFirst({
			where: { userId, name: dto.name }
		})

		if (isSameNameList) {
			throw new BadRequestException(
				'Task list with the same name already exists'
			)
		}

		return this.prisma.taskList.update({
			where: { userId, id: taskListId },
			data: {
				name: dto.name
			}
		})
	}

	async delete(userId: number, taskListId: number): Promise<ITaskList> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

		const taskList = await this.prisma.taskList.findUnique({
			where: { userId, id: taskListId }
		})

		if (taskList) throw new NotFoundException('Task list not found')

		return this.prisma.taskList.delete({
			where: {
				userId,
				id: taskListId
			}
		})
	}

	async adminDelete(userId: number, taskListId: number): Promise<ITaskList> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) throw new NotFoundException('User not found')

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
