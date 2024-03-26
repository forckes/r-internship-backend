import { Prisma } from '@prisma/client'
import { IsString } from 'class-validator'

export class TaskListDto implements Prisma.TaskListUpdateInput {
	@IsString()
	name: string
}
