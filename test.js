const unmerge = require('./main');
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
console.log(output);