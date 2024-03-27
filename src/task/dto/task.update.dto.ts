import { EnumTaskPriority, EnumTaskStatus, Prisma } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class TaskUpdateDto implements Prisma.TaskListUpdateInput {
	@IsString()
	@IsOptional()
	name: string

	@IsString()
	@IsOptional()
	description: string

	@IsOptional()
	@IsString()
	dueDate: string

	@IsEnum(EnumTaskPriority)
	@IsOptional()
	priority: EnumTaskPriority

	@IsEnum(EnumTaskStatus)
	@IsOptional()
	status: EnumTaskStatus

	@IsNumber()
	@IsOptional()
	taskListId: number
}
