// @flow

import mobx, {observable, computed} from 'mobx';


export default class ObservableTodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    /*eslint-disable*/
    mobx.autorun(() => console.log(this.report));
      /*eslint-disable*/
  }

  @computed get completedTodosCount() : number {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() : string {
    if (this.todos.length === 0)
      return '<none>';
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task : string) {
    this.todos.push({
      task,
      completed: false,
      assignee: null
    });
  }
}
