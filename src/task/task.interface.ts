import { EnumTaskPriority, EnumTaskStatus } from '@prisma/client'

export interface ITask {
	id: number
	name: string
	description: string
	dueDate: Date
	taskListId: number
	priority: EnumTaskPriority
	status: EnumTaskStatus
	userId: number
}
