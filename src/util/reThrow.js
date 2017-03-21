// @flow

export default
  (catcher: func): func =>
    (err: Object): func => {
      catcher(err);
      throw err;
    }
;
