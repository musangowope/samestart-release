export default (data = [], commonPropName) =>
  data.reduce((r, a) => {
    r[a[commonPropName]] = [...(r[a[commonPropName]] || []), a];
    return r;
  }, {});
