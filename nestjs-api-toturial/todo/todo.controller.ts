import { Controller, Get, Post, Put, Body, Logger, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';
import { get } from 'http';

@Controller('todo')
export class TodoController {

    private readonly logger = new Logger(TodoController.name);

    constructor(private readonly todoService: TodoService) { }

    @Get()
    findAll(): Todo[] {
        this.logger.log('Handling findAll() request...');
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id : number): Todo {
        this.logger.log('Handling findOne() request...');
        return this.todoService.findOne(id);
    }


    @Post()
    create(@Body() todo: Todo): void {
        this.logger.log('Handling Create() request...');
        return this.todoService.create(todo);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id : number, @Body() todo: Todo): void {
        this.logger.log('Handling Update() request...');
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id : number): void {
        this.logger.log('Handling Delete() request...');
        return this.todoService.remove(id);
    }

}