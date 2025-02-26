const express = require("express");
const users = require("./users");
const routers = express.Router();
const path = require("path");

// routers.get("/download", function (req, res) {
//   const filename = "gojek.png";
//   res.sendFile(__dirname + "/download" + filename);
// });

// routers.get("/download", function (req, res) {
//   const filename = "gojek.png";
//   res.sendFile(path.join(__dirname, "/download", filename), {
//     headers: {
//       "Content-Disposition": 'attachment; filename="gojek-photo.png',
//     },
//   });
// });

routers.get("/download", function (req, res) {
  const filename = "gojek.png";
  res.download(path.join(__dirname, "/download", filename), "gojek-photo.png");
});

routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    data: {
      username: username,
      password: password,
    },
  });
});

routers.post("/contoh", (req, res) => {
  res.send("request dengan method POST");
});
routers.put("/contoh", (req, res) => {
  res.send("request dengan method PUT");
});
routers.delete("/contoh", (req, res) => {
  res.send("request dengan method DELETE");
});
routers.all("/universal", function (req, res) {
  res.send("request dengan method " + req.method); // menggunakan semua metode
});
routers.get("/post/:id", (req, res) => {
  res.send("artikel-" + req.params.id); // routing dinamis menggunakan params
});

module.exports = routers;
