module.exports = require('./lib');

module.exports(function* () {
  var a = yield new Promise(function(resolve, reject) {
    setTimeout(resolve(100));
  });
  var b = yield step1(2442);

  return a + b;
}).then(
  ret => console.log(ret),
  err => console.log(err)
);

function* step1 (num) {
  return yield new Promise(function(resolve, reject) {
    setTimeout(resolve(num));
  });
}