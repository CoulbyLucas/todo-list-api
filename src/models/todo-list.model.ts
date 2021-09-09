/* eslint-disable @typescript-eslint/naming-convention */
import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {TodoWithRelations, UserWithRelations} from '.';
import {Todo} from './todo.model';
import {User} from './user.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'todoList'},
    foreignKeys: {
      fk_todo_list_userId: {
        name: 'fk_todo_list_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userid',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      },
    },
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
  createdAt?: string;

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Todo, {keyTo: 'todoId'})
  todos: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  todos?: TodoWithRelations;
}

export type TodoListWithRelations = TodoList & TodoListRelations;
