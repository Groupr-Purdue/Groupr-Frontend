import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

const AutoReactGridLayout = WidthProvider(ReactGridLayout);

const layout = [
  { i: 'AppBar', x: 0, y: 0, w: 12, h: 1, static: true },
  { i: 'children', x: 0, y: 1, w: 12, h: 5 },
];

const App = ({ children, routing }) =>
  <AutoReactGridLayout
    className="layout"
    layout={layout}
    cols={12}
    rowHeight={70}
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} >
    <AppBar
      key={'AppBar'}
      title="Groupr"
      onClick={() => routing.push('/test')}
      iconClassNameRight="muidocs-icon-navigation-expand-more" />
    <div key={'children'}>
      {children}
    </div>
  </AutoReactGridLayout>;

App.propTypes = {
  children: PropTypes.element,
  routing: PropTypes.object,
};

export default inject('routing')(observer(App));
