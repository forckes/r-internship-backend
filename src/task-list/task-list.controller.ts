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

@Controller('task-lists')
export class TaskListController {
	constructor(private readonly taskListService: TaskListService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.taskListService.getAll()
	}

	@Get(':id')
	async getListById(@Param('id') id: string) {
		return this.taskListService.getById(+id)
	}

	@HttpCode(200)
	@Post()
	async create(@Body() dto: TaskListDto) {
		return this.taskListService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async update(@Param('id') categoryId: string, @Body() dto: TaskListDto) {
		return this.taskListService.update(+categoryId, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') categoryId: string) {
		return this.taskListService.delete(+categoryId)
	}
}
