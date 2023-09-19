const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/BookRoutes");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRouter);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://solo:admin@cluster0.jnjzdgh.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
