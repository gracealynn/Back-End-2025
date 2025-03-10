const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
// const users = require("./users");
const express = require("express");
const app = express();
const routers = require("./routers");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "PUT"],
  })
);

// app.get("/", (req, res) => res.send("This is home page"));
// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.get("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();
//   const user = users.find((data) => data.name.toLowerCase() === name);
//   if (!user) {
//     return res.status(404).json({
//       message: "Data user tidak ditemukan",
//     });
//   }

//   res.status(200).json({ user });
// });

//routing
app.use(routers);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

const errorhandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
};

app.use(errorhandling);

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
