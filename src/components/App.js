// @flow


import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
const AutoReactGridLayout = WidthProvider(ReactGridLayout);

const layout : Array<Object> = [
  { i: 'AppBar', x: 0, y: 0, w: 12, h: 1, static: true },
  { i: 'children', x: 0, y: 1, w: 12, h: 5 },
];

const App =
  (
    { children, routing, navbar }:
    { children: Array<React$Element>, routing: Object, navbar: Object }
  ): React$Element =>
    <AutoReactGridLayout
      className='layout'
      layout={layout}
      cols={12}
      rowHeight={70}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} >
      <AppBar
        key={'AppBar'}
        title={navbar.title}
        onClick={(): Void => routing.push('/courses')}
        iconClassNameRight='muidocs-icon-navigation-expand-more' />
      <div key={'children'}>
        {children}
      </div>
    </AutoReactGridLayout>;

App.propTypes = {
  children: PropTypes.element,
  routing: PropTypes.object,
  navbar: PropTypes.object,
};

export default inject('routing', 'navbar')(observer(App));
