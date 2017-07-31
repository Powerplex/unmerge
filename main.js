const {
  pipe,
  reduce,
  ifElse,
  keys,
  is,
  map,
  split,
  curry,
  lensPath,
  view,
  set,
  clone,
  __,
  fromPairs,
  reject,
  isNil,
  forEach
} = require('ramda');

const getAllPathes = function(obj, prefix){
  prefix = prefix ? prefix + '.' : '';
  return Object.keys(obj).reduce((result, key) => {
      const property = obj[key];
      const withPrefix = prefix + key;
      if (typeof property === 'object') {
        result = result.concat(getAllPathes(property, withPrefix))
      } else {
        result.push(withPrefix)
      }
      return result;
    }, []);
};

const stringsToPathes = map(split('.'));

const filterPathesToReplace = key => pipe(
  map(path => path.pop() === key ? path : undefined),
  reject(isNil)
);

const resetValue = curry((path, key, obj) => {
   const toPath = lensPath(path);
   const value = view(toPath, obj)[key];
   return set(toPath, value, obj);
});

const replacePathes = curry((pathesToReplace, key, condition, object) => {
  let cloned = clone(object);
  forEach(
    path => cloned = resetValue(path, key, cloned),
    pathesToReplace
  );
  if (typeof condition === 'string') delete cloned[condition];
  return [key, cloned];
});

const unmergeByProperty = curry((key, condition, object) => pipe(
  getAllPathes,
  stringsToPathes,
  filterPathesToReplace(key),
  replacePathes(__, key, condition, object)
)(object));

const unmerge = (condition, object) => pipe(
  () => is(String, condition) ? object[condition] : condition,
  map(unmergeByProperty(__, condition, object)),
  fromPairs
)(object);

exports.byList = unmerge;
exports.byProperty = curry((restrict, object) => unmerge([restrict], object)[restrict])

// unmerge.byList('languages', data);
// or : unmerge.byList(['en', 'fr'], data);
// or : unmerge.byProperty('fr', data);
