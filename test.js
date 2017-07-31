const unmerge = require('./main');

const data = {
    "person": {
        "name": {
          fr: 'j\'aime les glaces',
          en: 'I love ice cream',
        },
        "age": 33
    },
};

const result = unmerge.byList(['en', 'fr'], data);

console.log(result);