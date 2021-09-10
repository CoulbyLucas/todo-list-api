import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {TodoList} from '../models';
import {TodoListRepository} from '../repositories';
@authenticate('jwt')
export class TodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository: TodoListRepository,
  ) {}

  @post('/todo-lists')
  @response(200, {
    description: 'TodoList model instance',
    content: {'application/json': {schema: getModelSchemaRef(TodoList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, {
            title: 'NewTodoList',
            exclude: ['id'],
          }),
        },
      },
    })
    todoList: Omit<TodoList, 'id'>,
  ): Promise<TodoList> {
    return this.todoListRepository.create(todoList);
  }

  @get('/todo-lists')
  @response(200, {
    description: 'Array of TodoList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TodoList, {includeRelations: false}),
        },
      },
    },
  })
  async find(): Promise<TodoList[]> {
    return this.todoListRepository.find({include: ['todos', 'user']});
  }

  @get('/todo-lists/{id}')
  @response(200, {
    description: 'TodoList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TodoList, {includeRelations: false}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TodoList> {
    return this.todoListRepository.findById(id, {include: ['todos', 'user']});
  }

  @put('/todo-lists/{id}')
  @response(204, {
    description: 'TodoList PUT success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, {partial: true}),
        },
      },
    })
    todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.updateById(id, todoList);
  }

  @del('/todo-lists/{id}')
  @response(204, {
    description: 'TodoList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoListRepository.deleteById(id);
  }
}
