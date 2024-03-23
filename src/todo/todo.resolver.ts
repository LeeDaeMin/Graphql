import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs/index';
import { StatusArgs } from './dto/args/status.args';

@Resolver()
export class TodoResolver {

  constructor(
    private readonly todoService: TodoService
  ) { }

  @Query(() => [Todo])
  findAll(
    //! Tarea: Args
    // FIXME:
    @Args('stuatusArgs') statusArg : StatusArgs
  ): Todo[] {
    return this.todoService.finOneStatus(statusArg.status);
  }

  @Query(() => Todo, { name: "Find" })
  findOne(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.todoService.findOneId(id);
  }

  @Mutation(() => Todo, { name: 'CreateToDO' })
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput
  ) {
    return this.todoService.create(createTodoInput);
  }


  @Mutation(() => Todo, { name: 'UpdateTODO' })
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ) {
    return this.todoService.update(updateTodoInput);
  }


  @Mutation(() => Boolean, { name: 'Eliminar', description: 'Eliminar un TODO' })
  removeTodo(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.todoService.delete(id)
  }
}
