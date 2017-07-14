function is (target, type) {
  return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
}

module.exports = {
  isArray(target) {
    return is(target, 'Array');
  },
  isPromise(target) {
    return target instanceof Promise;
  },
  isError(target) {
    return target instanceof Error;
  },
  isGenerator(target) {
    return is(target, 'Generator');
  },
  isGeneratorFunc(target) {
    return is(target, 'GeneratorFunction');
  },
  is
}