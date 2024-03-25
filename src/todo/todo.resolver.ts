import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs/index';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver()
export class TodoResolver {

  constructor(
    private readonly todoService: TodoService
  ) { }

  @Query(() => [Todo], { name: 'todos' })
  findAll(
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
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


  @Query( () => Int, { name: 'totalTodo'} )
  totalTodo () {
    return this.todoService.totalTodo;
  }


  @Query( () => Int, { name: 'complete'} )
  completeTODO () {
    return this.todoService.completeTODO;

  }

  @Query( () => Int, { name: 'Pending'} )
  pedingTODO () {
    return this.todoService.pedingTODO;
  }

  @Query( () => AggregationsType )
  aggregations (): AggregationsType  {
    return {
      complete: this.todoService.completeTODO,
      pending: this.todoService.pedingTODO,
      total: this.todoService.totalTodo
    }
  }
}
