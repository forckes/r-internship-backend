import { Prisma } from '@prisma/client'
import { returnTaskObject } from 'src/task/return-task-list.object'

export const returnTaskListObject: Prisma.TaskListSelect = {
	id: true,
	name: true,
	tasks: {
		select: returnTaskObject
	}
}
