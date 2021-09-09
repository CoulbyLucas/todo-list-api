import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TodoDataSource} from '../datasources';
import {Todolist, TodolistRelations} from '../models';

export class TodolistRepository extends DefaultCrudRepository<
  Todolist,
  typeof Todolist.prototype.id,
  TodolistRelations
> {
  constructor(
    @inject('datasources.todo') dataSource: TodoDataSource,
  ) {
    super(Todolist, dataSource);
  }
}
