import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TaskListService } from './task-list.service'
import { TaskListDto } from './task-list.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('task-lists')
export class TaskListController {
	constructor(private readonly taskListService: TaskListService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: number) {
		return this.taskListService.getAll(userId)
	}

	@Get(':id')
	@Auth()
	async getListById(
		@CurrentUser('id') userId: number,
		@Param('id') id: string
	) {
		return this.taskListService.getById(userId, +id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: number, @Body() dto: TaskListDto) {
		return this.taskListService.create(userId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@CurrentUser('id') userId: number,
		@Param('id') taskListId: string,
		@Body() dto: TaskListDto
	) {
		return this.taskListService.update(userId, +taskListId, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(
		@CurrentUser('id') userId: number,
		@Param('id') taskListId: string
	) {
		return this.taskListService.delete(userId, +taskListId)
	}
}
