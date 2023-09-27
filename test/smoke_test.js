
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Book = require("../models/Book");
const expect = chai.expect;

chai.use(chaiHttp);

// smoke test for getAllBooks method
describe("getAllBooks_smoke_test", () => {
    it("should retrieve a list of books", (done) => {
        chai
            .request(app)
            .get("/api/books")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status').to.equal('success');
                expect(res.body.data).to.be.an("array");

                done();
            });
    }).timeout(10000);
});


//
//
//
// smoke test for createBook method
describe("createBook_smoke_test", () => {
    it("should create a new book", (done) => {
        const newBook = {
            title: "smoke_test title",
            body: "smoke_test body",
        };

        chai
            .request(app)
            .post("/api/books")
            .send(newBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status').to.equal('success');

                done();
            });
    }).timeout(10000);
});


//
//
//
// smoke test for updateBook method
describe("updateBook_smoke_test", () => {
    it("should update a book", (done) => {
        let book = new Book({
            title: "smoke_test update title",
            body: "smoke_test update body",
        });

        book.save((err, book) => {
            chai
                .request(app)
                .put("/api/books/" + book.id)
                .send({
                    title: "smoke_test updated book",
                    body: "smoke_test updated body"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    expect(res.body).to.have.property('status').to.equal('updated');

                    done();
            });
        });
    }).timeout(10000);
});


//
//
//
// smoke test for deleteBook method
describe("deleteBook_smoke_test", () => {
    it("should delete a book", (done) => {

        let book = new Book({
            title: "smoke_test title for deletion",
            body: "smoke_test body for deletion"
        });

        book.save((err, book) =>
        {
            chai
                .request(app)
                .delete("/api/books/" + book.id)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    expect(res.body).to.have.property('status').to.equal('successfully deleted');

                    done();
                });
        });
    }).timeout(10000);
});
