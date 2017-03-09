// @flow

// given a function fn, passthrouh will return a new function ret that
// will return the first argument passed to it.
export default
  (fn: func): func =>
    (arg: object): object => {
      fn(arg);
      return arg;
    }
  ;
