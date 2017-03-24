import React from 'react';
import snackbar from '~/store/snackbar';
import { observer } from 'mobx-react';
import { Snackbar } from 'material-ui';

const AppSnackbar = (): Element =>
  <Snackbar {...snackbar.state} />;

export default observer(AppSnackbar);
