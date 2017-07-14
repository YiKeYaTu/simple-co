# 一个简易的 generator 执行器

```javascript
  const co = require('./');

  co(function* () {
    const a = Promise.resolve(1);
    const b = yield Promise.all([1, 3, a]);

    return b;
  }).then(
    ret => console.log(ret),
    err => console.log(err)
  );

```