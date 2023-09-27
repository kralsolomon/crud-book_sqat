# crud-book_sqat

small CRUD app, which demonstrates basic database operations

## How to run tests

run "npm test" command

```bash
npm test
```

## How to run stress_test

if you want to run stress_test, you need installed k6 testing tool on your pc/laptop


```bash
k6 run stress_test.js
```



## Usage

```javascript
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app")
const Book = require("../models/Book");
const expect = chai.expect;

chai.use(chaiHttp);
```

