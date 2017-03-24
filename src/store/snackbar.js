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
      autoHideDuration = 1500,
      onActionTouchTap = this.close,
      onRequestClose = this.close,
    } = {}
) {
    this.state = {
      open,
      message,
      action: actionLabel,
      autoHideDuration,
      onActionTouchTap,
      onRequestClose,
    };

    console.log(this.state);
  }
}

export default new Snackbar();
