import { EnumTaskAction, EnumTaskStatus, Prisma } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class TaskListDto implements Prisma.TaskListUpdateInput {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	dueDate: string

	@IsEnum(EnumTaskAction)
	priority: EnumTaskAction

	@IsEnum(EnumTaskStatus)
	status: EnumTaskStatus

	@IsNumber()
	taskListId: number

	@IsNumber()
	userId: number
}
