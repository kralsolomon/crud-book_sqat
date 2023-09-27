# crud-book_sqat

small CRUD app, which demonstrates basic database operations

## How to run test

run "npm test" command

```bash
npm test
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

