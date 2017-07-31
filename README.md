# unmerge
Generate multiple versions of an object depending on a list or specific property.
Can be easily used for writing dev/prod configurations or handling translations inside an object.

Examples :

1 - With a list of criterias :
```javascript
const unmerge = require('unmerge');
const data = {
    "person": {
        "name": 'Johnny',
        "age": 33,
        "nationality": {
          "fr": "Anglais",
          "en": "English"
        }
    },
};

const output = unmerge.byList(['en', 'fr'], data);
/**
output:
{ en: { person: { name: 'Johnny', age: 33, nationality: 'English' } },
  fr: { person: { name: 'Johnny', age: 33, nationality: 'Anglais' } } }
*/
```

2 - With a specific criteria (single output) :
```javascript
const unmerge = require('unmerge');
const data = {
    "person": {
        "name": 'Johnny',
        "age": 33,
        "nationality": {
          "fr": "Anglais",
          "en": "English"
        }
    },
};

const output = unmerge.byProperty('en', data);
/**
output:
{ person: { name: 'Johnny', age: 33, nationality: 'English' } }
*/
```

3 - Using one of the object's property to unmerge :
```javascript
const unmerge = require('unmerge');
const data = {
    "env": ['prod', 'dev'],
    "config": {
        "basePath": './',
        "scripts": {
          "dev": "./scripts/",
          "prod": "./build/minified/"
        }
    },
};

const output = unmerge.byList('env', data);
/**
output:
{ prod: { config: { basePath: './', scripts: './build/minified/' } },
  dev: { config: { basePath: './', scripts: './scripts/' } } }

*/
```
