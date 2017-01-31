// @flow

import React from 'react';
import { render } from 'react-dom';
import mobx, { observable, computed } from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import { Router, Route, browserHistory } from 'react-router';

// required by material-ui at entry
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';



import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
const routingStore = new RouterStore();

import TodoStore from './TodoStore'; 
const todoStore = new TodoStore();

const stores = {
  routing: routingStore,
  todoStore,
};
        
const history = syncHistoryWithStore(browserHistory, routingStore);

const test : integer = 'sldkfjsl';

class ObservableTodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    mobx.autorun(() => console.log(this.report));
  }

  @computed get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}


                        

@inject('todoStore')
@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.todoStore;
    return (
      <div>
      { store.report }
      <ul>
      { store.todos.map(
        (todo, idx) => <TodoView todo={ todo } key={ idx } />
      ) }
      </ul>
      { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
      <RaisedButton primary onClick={ this.onNewTodo }>New Todo</RaisedButton>
      <small> (double-click a todo to edit)</small>
      </div>
    );
  }

  onNewTodo = () => {
    this.props.todoStore.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
}

@observer
class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
      <input
      type='checkbox'
      checked={ todo.completed }
      onChange={ this.onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
      }
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
}

render(
  <MuiThemeProvider>
    <Provider {...stores}>
      <Router history={history}>
        <Route path='/' component={TodoList} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
                        
