import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {

    private storage: Todo[] = [];

    findAll(): Todo[] {
        return this.storage;
    }

    create(todo: Todo): void {
        todo.id = this.storage.length + 1;
        console.log(todo.id);
        this.storage.push(todo);
    }

    findOne(id: number): Todo {
        return this.storage.find((t: Todo) => t.id === id);
    }

    update(id: number, todo: Todo): void {
        const index = this.storage.findIndex((t: Todo) => t.id === id);
        this.storage[index] = todo;
    }

    remove(id: number): void {
        const index = this.storage.findIndex((t: Todo) => t.id === id);
        this.storage.splice(index, 1);
    }


}