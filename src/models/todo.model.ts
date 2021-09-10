/* eslint-disable @typescript-eslint/naming-convention */
import {User} from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TodoListWithRelations} from '.';
import {TodoList} from './todo-list.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'todo'},
    // foreignKeys: {
    //   fk_todo_userId: {
    //     name: 'fk_todo_userId',
    //     entity: 'User',
    //     entityKey: 'id',
    //     foreignKey: 'userid',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'SET NULL',
    //   },
    //   fk_todo_todoListId: {
    //     name: 'fk_todo_todoListId',
    //     entity: 'TodoList',
    //     entityKey: 'id',
    //     foreignKey: 'todolistid',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'SET NULL',
    //   },
    // },
  },
})
export class Todo extends Entity {
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
  })
  desc?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isComplete?: boolean;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  todoList?: TodoListWithRelations;
}

export type TodoWithRelations = Todo & TodoRelations;
