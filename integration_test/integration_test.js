import pm from "chai/chai";


//test for GET method
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Each element in the data array has _id, title, body, createdAt, and __v properties", function () {
    pm.response.json().data.forEach(function(book) {
        pm.expectation(book).to.have.all.keys('_id', 'title', 'body', 'createdAt', '__v');
    });
});


//test for POST method
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("data property is an object with _id, title, body, createdAt, and __v properties", function () {
    let data = pm.response.json().data;
    pm.expectation(data).to.be.an('object').that.has.all.keys('_id', 'title', 'body', 'createdAt', '__v');
});



//test for DELETE method
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Successful delete status response", function () {
    let response = pm.response.json();
    pm.expectation(response.status).to.equal("successfully deleted");
});


