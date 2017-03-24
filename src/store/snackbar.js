import { action, observable } from 'mobx';

class Snackbar {
  @observable state = {};

  constructor() {
    this.open({ open: false });
  }

  @action.bound
  close() {
    this.state.open = false;
  }

  @action.bound
  open(
    {
      open = true,
      message = 'Something happened...',
      actionLabel = 'Take Action!',
      autoHideDuration = 3000,
      onAction = this.close,
      onClose = this.close,
    } = {}
) {
    this.state = {
      open,
      message,
      action: actionLabel,
      autoHideDuration,
      onActionTouchTap: onAction,
      onRequestClose: onClose,
    };
  }
}

export default new Snackbar();
