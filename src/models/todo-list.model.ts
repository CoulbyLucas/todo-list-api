/* eslint-disable @typescript-eslint/naming-convention */
import {User} from '@loopback/authentication-jwt';
import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {TodoWithRelations} from '.';
import {Todo} from './todo.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'todoList'},
  },
})
export class TodoList extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'date',
  })
  createdAt?: string = new Date().toLocaleDateString();

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Todo, {keyTo: 'todoId'})
  todos: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
  todos?: TodoWithRelations;
}

export type TodoListWithRelations = TodoList & TodoListRelations;
