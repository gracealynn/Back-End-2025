const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const users = require("./users");
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("This is home page"));
app.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "response success",
    description: "Exercise 3",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
  })
);

app.get("/users", (req, res) => {
  res.send(users);
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
