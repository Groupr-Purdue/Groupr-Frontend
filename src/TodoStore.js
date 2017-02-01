// @flow

import mobx, { observable, computed } from 'mobx';


export default class ObservableTodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    mobx.autorun(() => console.log(this.report));
  }

  @computed get completedTodosCount() : number {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() : string {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task : string) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}
