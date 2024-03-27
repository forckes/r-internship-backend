import { EnumTaskPriority, EnumTaskStatus } from '@prisma/client'

export interface ITask {
	name: string
	description: string
	dueDate: Date
	taskListId: number
	priority: EnumTaskPriority
	status: EnumTaskStatus
}
