const run = require('./run');

function co (generator) {
  const g = generator();
  return run(g.next(), g).then(
    ret => ret,
    err => err
  );
}

module.exports = co;