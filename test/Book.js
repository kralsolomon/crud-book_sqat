
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Book = require("../models/Book");
chai.should();

chai.use(chaiHttp);

describe("Books", () => {
  beforeEach((done) => {
    Book.deleteMany({}, (err) => {
      done();
    });
  });

//
//
//
// unit test for getBook method
    
  describe("getAllBooks_unit_test", () => {
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


//
//
//
// unit test for createBook method
  describe("createBook_unit_test", () => {
    it("it should new POST a book", (done) => {
      let book = {
        title: "unit_test title",
        body: "unit_test body"
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


//
//
//
// unit test for getBookById method
  describe("getBookById_unit_test", () => {
    it("it should GET a book by the id", (done) => {
      let book = new Book({
        title: "unit_test title",
        body: "unit_test body"
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


//
//
//
// unit test for updateBook method
  describe("updateBook_unit_test", () => {
    it("it should UPDATE a book given the id", (done) => {
      let book = new Book({
        title: "unit_test title",
        body: "unit_test body"
      });

      book.save((err, book) => {
        console.log(book.id);
        chai
          .request(app)
          .put("/api/books/" + book.id)
          .send({
            title: "The title was updated",
            body: "This body was updated"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("updated");
            done();
          });
      });
    });
  });


//
//
//
// unit test for deleteBook method
  describe("deleteBook_unit_test", () => {
    it("it should DELETE a book given the id", (done) => {
      let book = new Book({
        title: "unit_test title",
        body: "unit_test body"
      });
      book.save((err, book) => {
        chai
          .request(app)
          .delete("/api/books/" + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("successfully deleted");
            done();
          });
      });
    });
  });
});
