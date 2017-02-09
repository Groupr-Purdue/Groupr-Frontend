// @flow

import { observable, computed, action } from 'mobx';

export default class UserStore {
  @observable todos = [];
  @computed get completedTodosCount(): number {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }
  @action addTodo(task: Object) {
    this.todos.push({
      task,
      completed: false,
      assignee: null,
    });
  }
}
