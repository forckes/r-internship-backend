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

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.taskService.getAll()
	}

	@Get(':id')
	async getTaskById(@Param('id') id: string) {
		return this.taskService.getById(+id)
	}

	@HttpCode(200)
	@Post()
	async create(@Body() dto: TaskDto) {
		return this.taskService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async update(@Param('id') taskId: string, @Body() dto: TaskUpdateDto) {
		return this.taskService.update(+taskId, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') taskId: string) {
		return this.taskService.delete(+taskId)
	}
}
