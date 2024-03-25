import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs/index';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            description: 'Learn',
            done: true
        },
        {
            id: 2,
            description: 'Write',
            done: false
        },
        {
            id: 3,
            description: 'Speak',
            done: false
        }
    ];


    get totalTodo () {
        return this.todos.length;
    }

    get completeTODO () {
        return  this.todos.filter( todo => todo.done === true).length;
    }

    get pedingTODO() {
        return this.todos.filter( todo => todo.done === false).length;
    }


    findAll(  statusArgs: StatusArgs ): Todo[] {
        const { status } = statusArgs;
        if( status !== undefined ) return this.todos.filter( todo => todo.done === status );
        return this.todos;
    }

    findOneId(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) throw new NotFoundException(`Todo with oid ${id} not found`);

        return todo;
    }

    create(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();

        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

        this.todos.push(todo);

        return todo
    }


    update({ id, description, done }: UpdateTodoInput) {

        const todoToUpdate = this.findOneId(id);


        if (description) todoToUpdate.description = description;
        if (done !== undefined) todoToUpdate.done = done


        this.todos = this.todos.map(todo => {
            return (todo.id === id) ? todoToUpdate : todo;
        });

        return todoToUpdate;

    }

    delete(id: number) {
        const todo = this.findOneId(id);

        this.todos = this.todos.filter(todo => todo.id !== id);

        return true;
    }

}
