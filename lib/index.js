const run = require('./run');

function co (generatorFun) {
  const generator = generatorFun();
  return run(generator.next(), generator).then(
    ret => ret,
    err => Promise.reject(err)
  );
}

module.exports = co;