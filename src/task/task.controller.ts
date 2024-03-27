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
import { TaskService } from './task.service'
import { TaskUpdateDto } from './dto/task.update.dto'
import { TaskDto } from './dto/task.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: number) {
		return this.taskService.getAll(userId)
	}

	@Get(':id')
	@Auth()
	async getTaskById(
		@CurrentUser('id') userId: number,
		@Param('id') id: string
	) {
		return this.taskService.getById(userId, +id)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: number, @Body() dto: TaskDto) {
		return this.taskService.create(userId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@CurrentUser('id') userId: number,
		@Param('id') taskId: string,
		@Body() dto: TaskUpdateDto
	) {
		return this.taskService.update(userId, +taskId, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: number, @Param('id') taskId: string) {
		return this.taskService.delete(userId, +taskId)
	}
}
