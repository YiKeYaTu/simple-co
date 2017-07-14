const { 
  isArray, isObject, 
  isPromise, isError,
  isGenerator, isGeneratorFunc
} = require('./is');

module.exports = function (value, run) {
  if (isPromise(value)) return value;
  if (isArray(value)) return promisifyArray(value);
  if (isGenerator(value)) return promisifyGenerator(value, run);
  if (isGeneratorFunc(value)) return promisifyGeneratorFunc(value, run);

  return Promise.resolve(value);
}

function promisifyArray (arr) {
  return Promise.all(arr.map(item => {
    return new Promise(function (resolve, reject) {
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
  }));
}

function promisifyGenerator (generator, run) {
  return run(generator.next(), generator);;
}

function promisifyGeneratorFunc (generatorFunc, run) {
  const generator = generatorFunc();
  return run(generator.next(), generator);
}
