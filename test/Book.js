
let Book = require("../models/Book");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Books", () => {
  beforeEach((done) => {
    Book.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET book", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(app)
        .get("/api/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST book", () => {
    it("it should new POST a book", (done) => {
      let book = {
        title: "This is the first book",
        body: "This is a book post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      };
      chai
        .request(app)
        .post("/api/books")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id book", () => {
    it("it should GET a book by the id", (done) => {
      let book = new Book({
        title: "This is the first book",
        body: "This is a book post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      book.save((err, book) => {
        chai
          .request(app)
          .get("/api/books/" + book.id)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id book", () => {
    it("it should UPDATE a book given the id", (done) => {
      let book = new Book({
        title: "This is the first book",
        body: "This is a book post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      book.save((err, book) => {
        console.log(book.id);
        chai
          .request(app)
          .put("/api/books/" + book.id)
          .send({
            title: "The first book was updated",
            body: "This is a book post",
            image:
              "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id book", () => {
    it("it should DELETE a book given the id", (done) => {
      let book = new Book({
        title: "This is the first book",
        body: "This is a book post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      book.save((err, book) => {
        chai
          .request(app)
          .delete("/api/books/" + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});
