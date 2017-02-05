// @flow

import React from 'react';
import { render } from 'react-dom';
import { autorun } from 'mobx';
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

autorun(() => console.log(TodoStore.report));

const stores = {
  routing: routingStore,
  todoStore: TodoStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

const newTodo = store => () => store.addTodo(prompt('slkdjlds:', 'sdklfjdskfj'))

const TodoList = inject('todoStore')(observer(({ todoStore: store }) =>
  <div>
    { store.report }
    <ul>
      { store.todos.map(
        (todo, idx) => <TodoView todo={todo} key={idx} />

      ) }
    </ul>
    { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }

    <RaisedButton
      primary={true}
      onClick={
        newTodo(store)
      } > New Todo</RaisedButton>

    <small> (double-click a todo to edit)</small>
  </div>
));

const onToggleCompleted = todo => () => {
  todo.completed = !todo.completed;
};


const onRename = todo => ev => {
  /*eslint-disable */
  console.log(ev.target.tagName.toLowerCase())
  if(ev.target.tagName.toLowerCase() === 'li')
    todo.task = prompt('Task name', todo.task) || todo.task;
  /*eslint-disable */
};

const TodoView = observer(
  ({todo}) =>
    <li onDoubleClick={onRename(todo)}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggleCompleted(todo)} />
      { todo.task }
      { todo.assignee ?
        <small>{ todo.assignee.name }</small> :
        null
      }
    </li>
);

render(
  <MuiThemeProvider>
    <Provider {...stores}>
      <Router history={history}>
        <Route path="/" component={TodoList} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
