// @flow

import React from 'react';
import { RaisedButton } from 'material-ui';
import { Grid, Row } from 'react-flexbox-grid-aphrodite';
import { Pulse } from 'better-react-spinkit';
import { observer } from 'mobx-react';
import { action } from 'mobx';
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
              <h3 style={{ color: 'deeppink' }}>
                {loading.waitingFor} has failed to load.
              </h3>
            </Row>
            {
              loading.recoverable ?
                <Row center='xs' middle='xs'>
                  <RaisedButton
                    label='Go Back?'
                    secondary={true}
                    onClick={action((): string => loading.state = 'loaded')} />
                </Row> :
                <Row center='xs' middle='xs'>
                  <RaisedButton
                    label='Go Back?'
                    disabled={true}
                    onClick={action((): string => loading.state = 'loaded')} />
                </Row>
            }

          </Grid>
        );

      return <Naked {...props} />;
    });

export default loadingWrapper;
