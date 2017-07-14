const toPromise = require('./to-promise');

function run (result, generator) {
  const { value, done } = result;

  if (done === true) {
    return toPromise(value);
  }

  return toPromise(value, run)
    .then(
      ret => run(generator.next(ret), generator),
      err => run(generator.throw(err), generator)
    );
}
  

module.exports = run;
