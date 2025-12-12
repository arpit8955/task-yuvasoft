const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./db/connect");
require("dotenv").config();
const response = require("./middlewares/response");


connectDB(process.env.MONGO_URI);
app.use(express.json());

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
app.use('/user', userRouter);

app.use('/post', postRouter);


app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
