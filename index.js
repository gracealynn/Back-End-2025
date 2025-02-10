const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const users = require("./users");

const server = http.createServer((req, res) => {
  // res.write(hello);
  // res.write(greetings());
  const url = req.url;
  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write("This is the home page.");
  } else if (url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write(
      JSON.stringify({
        Status: "success",
        Message: "response success",
        Description: "Exercise#02",
        Date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
    );
  } else if (url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write(
      JSON.stringify({
        users,
      })
    );
  } else {
    res.statusCode = 404;
    res.write(
      JSON.stringify({
        Status: "not found",
        Message: "router tidak ditemukan",
        Date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
    );
  }
  res.end();
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
