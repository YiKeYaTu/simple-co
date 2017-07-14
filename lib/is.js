function is (target, type) {
  return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
}

module.exports = {
  isArray(target) {
    return is(target, 'array');
  },
  isPromise(target) {
    return target instanceof Promise;
  },
  isError(target) {
    return target instanceof Error;
  },
  is
}