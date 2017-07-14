const run = require('./run');

function co (generatorFunc) {
  const args = Array.from(arguments).slice(1);
  const generator = generatorFunc(...args);
  return run(generator.next(), generator).then(
    ret => ret,
    err => Promise.reject(err)
  );
}

function warp (generatorFunc) {
  return function () {
    co(generatorFunc, ...arguments);
  }
}

co.warp = warp;

module.exports = co;