import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TodoDataSource} from '../datasources';
import {User, UserRelations, Todo, TodoList} from '../models';
import {TodoRepository} from './todo.repository';
import {TodoListRepository} from './todo-list.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof User.prototype.id>;

  public readonly todoLists: HasManyRepositoryFactory<TodoList, typeof User.prototype.id>;

  constructor(
    @inject('datasources.todo') dataSource: TodoDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(User, dataSource);
    this.todoLists = this.createHasManyRepositoryFactoryFor('todoLists', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoLists', this.todoLists.inclusionResolver);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}
