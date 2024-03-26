import { Prisma } from '@prisma/client'
import { returnTaskListObject } from 'src/task-list/return-task-list.object'
import { returnUserObject } from 'src/user/return-user.object'

export const returnTaskObject: Prisma.TaskSelect = {
	id: true,
	createdAt: true,
	updatedAt: true,
	name: true,
	description: true,
	dueDate: true,
	priority: true,
	status: true,
	taskList: {
		select: returnTaskListObject
	},
	user: {
		select: returnUserObject
	},
	activityLogs: true
}
