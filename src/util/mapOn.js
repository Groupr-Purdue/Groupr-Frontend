// @flow

export default
  (to: Object): func =>
    (from: Object): func =>
      (key: string): Any =>
        to[key] = from[key];
