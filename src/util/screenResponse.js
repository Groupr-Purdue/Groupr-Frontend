// @flow

export default (res: Object): Object => {
  if (res.status >= 200 && res.status < 300) return res;
  throw res;
};
