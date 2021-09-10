import {authenticate} from '@loopback/authentication';
import {User} from '@loopback/authentication-jwt';
import {Filter, repository} from '@loopback/repository';
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
import {Todo, TodoList} from '../models';
import {TodoRepository} from '../repositories';
export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @authenticate('jwt')
  @post('/todos')
  @response(200, {
    description: 'Todo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodo',
            exclude: ['id'],
          }),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  @authenticate('jwt')
  @get('/todos')
  @response(200, {
    description: 'Array of Todo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todo, {includeRelations: false}),
        },
      },
    },
  })
  async find(@param.filter(Todo) filter?: Filter<Todo>): Promise<Todo[]> {
    return this.todoRepository.find({include: ['user', 'todoList']});
  }

  @authenticate('jwt')
  @get('/todos/{id}')
  @response(200, {
    description: 'Todo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todo, {includeRelations: false}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Todo> {
    return this.todoRepository.findById(id, {include: ['user', 'todoList']});
  }

  @authenticate('jwt')
  @put('/todos/{id}')
  @response(204, {
    description: 'Todo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Todo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @del('/todos/{id}')
  @response(204, {
    description: 'Todo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }

  @get('/todos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Todo.prototype.id,
  ): Promise<User> {
    return this.todoRepository.user(id);
  }

  @get('/todos/{id}/todo-list', {
    responses: {
      '200': {
        description: 'TodoList belonging to Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TodoList)},
          },
        },
      },
    },
  })
  async getTodoList(
    @param.path.number('id') id: typeof Todo.prototype.id,
  ): Promise<TodoList> {
    return this.todoRepository.todoList(id);
  }
}
