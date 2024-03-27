import { EnumTaskPriority, EnumTaskStatus, Prisma } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class TaskDto implements Prisma.TaskListUpdateInput {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	dueDate: string

	@IsEnum(EnumTaskPriority)
	priority: EnumTaskPriority

	@IsEnum(EnumTaskStatus)
	status: EnumTaskStatus

	@IsNumber()
	taskListId: number
}
