import {User} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Todo} from '../models';
import {TodoRepository} from '../repositories';

export class TodoUserController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

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
}
