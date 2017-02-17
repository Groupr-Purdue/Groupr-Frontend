// @flow

import React from 'react';
import { Grid, Row } from 'react-flexbox-grid-aphrodite';
import { Pulse } from 'better-react-spinkit';
import navbar from '~/store/navbar';
import { observer } from 'mobx-react';

const loadingWrapper =
  (Naked: Component): Component =>
    observer((...props: Object): Element => {
      if (navbar.loading)
        return (
          <Grid>
            <Row center='xs' middle='xs' style={{ height: '50%' }}>
              <Pulse size={100} />
            </Row>
          </Grid>
        );

      return <Naked {...props} />;
    });

export default loadingWrapper;
