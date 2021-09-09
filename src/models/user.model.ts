import {Entity, hasMany, model, property} from '@loopback/repository';
import {TodoListWithRelations, TodoWithRelations} from '.';
import {TodoList} from './todo-list.model';
import {Todo} from './todo.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'user'},
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @hasMany(() => Todo, {keyTo: 'userId'})
  todos: Todo[];

  @hasMany(() => TodoList, {keyTo: 'userId'})
  todoLists: TodoList[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  todos?: TodoWithRelations;
  todoLists?: TodoListWithRelations;
}

export type UserWithRelations = User & UserRelations;
