
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app")
const Book = require("../models/Book");
const expect = chai.expect;

chai.use(chaiHttp);


// integration test for getAllBooks method
describe("getAllBooks_integration_test", () => {
    it("should return a list of books", (done) => {
        chai
            .request(app)
            .get("/api/books")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("data");
                expect(res.body).to.have.property("status").to.equal("success");
                done();
            });
    }).timeout(10000);


});

//
//
//
// integration test for createBook method
describe("createBook_integration_test", () => {
    it("should create a new book", (done) => {
        const newBook = {
            title: "Integration_test book",
            body: "Integration_test body",
        };

        chai
            .request(app)
            .post("/api/books")
            .send(newBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("status").to.equal("success");
                expect(res.body.data).to.have.property("title").to.equal(newBook.title);
                expect(res.body.data).to.have.property("body").to.equal(newBook.body);
                done();
            });
    }).timeout(10000);

});

//
//
//
// integration test for updateBook method
describe("updateBook_integration_test", () => {
    it("should update a book", (done) => {
        let updatedBook = new Book({
            title: "integration_test updated title",
            body: "integration_test updated body"
        });
        updatedBook.save((err, updatedBook)=>
        {
        chai
            .request(app)
            .put(`/api/books/` + updatedBook.id)
            .send(updatedBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("data");
                expect(res.body).to.have.property("status").to.equal("updated");

                done();
            });
        });
    }).timeout(10000);

});

//
//
//
// integration test for deleteBook method
describe("deleteBook_integration_test", () => {
    it("should delete a book", (done) => {
        let deletedBook = new Book({
            title: "integration_test title for deletion",
            body: "integration_test body for deletion"
        });
        deletedBook.save((err, deletedBook)=> {
            chai
                .request(app)
                .delete(`/api/books/` + deletedBook.id)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("status").to.equal("successfully deleted");

                    done();
                });
        });
    }).timeout(10000);
});

