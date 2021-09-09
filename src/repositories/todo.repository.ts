import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TodoDataSource} from '../datasources';
import {Todo, TodoRelations, User, TodoList} from '../models';
import {UserRepository} from './user.repository';
import {TodoListRepository} from './todo-list.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Todo.prototype.id>;

  public readonly todoList: BelongsToAccessor<TodoList, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.todo') dataSource: TodoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(Todo, dataSource);
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
