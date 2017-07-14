const { isArray, isObject, isPromise, isError } = require('./is');

module.exports = function run (result, generator) {
  let { value, done } = result;
  let yieldFunc;

  if (done === true) {
    return value;
  }

  if (isArray(value)) {
    yieldFunc = yieldArray;
  } else if (isPromise(value)) {
    yieldFunc = yieldPromise;
  } else {
    yieldFunc = yieldValue;
  }

  return yieldFunc(value)
    .then(
      ret => run(generator.next(ret), generator),
      err => run(generator.throw(err), generator)
    );
}

const yieldPromise = value => value;

const yieldValue = value => Promise.resolve(value);

const yieldArray = arr => (
  Promise.all(arr.map(item => {
    return new Promise((resolve, reject) => {
      if (isPromise(item)) {
        return item
          .then(
            ret => resolve(ret),
            err => reject(err)
          );
      } else if (isError(item)) {
        return reject(item);
      } else {
        return resolve(item);
      }
    });
  }))
);