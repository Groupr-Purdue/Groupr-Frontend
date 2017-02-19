// @flow

import React from 'react';
import { Grid, Row } from 'react-flexbox-grid-aphrodite';
import { Pulse } from 'better-react-spinkit';
import { observer } from 'mobx-react';
import Loading from '~/store/loading';

const loadingWrapper =
  (Naked: Component, loading: Loading): Component =>
    observer((...props: Object): Element => {
      if (loading.state === 'loading')
        return (
          <Grid>
            <Row center='xs' middle='xs' style={{ height: '50%' }}>
              <Pulse size={100} />
            </Row>
          </Grid>
        );

      if (loading.state === 'failed')
        return (
          <Grid>
            <Row center='xs' middle='xs' style={{ height: '50%' }}>
              <h3>
                {loading.waitingFor} has failed to load.
              </h3>
            </Row>
          </Grid>
        );

      return <Naked {...props} />;
    });

export default loadingWrapper;
