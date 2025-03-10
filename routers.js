const express = require("express");
const users = require("./users");
const routers = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "public" });

routers.use(express.json());

routers.get("/users", function (req, res) {
  res.send(users);
});
routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((data) => data.name.toLowerCase() === name);
  if (!user) {
    return res.status(404).json({
      message: "Data user tidak ditemukan",
    });
  }
  res.json(user);
});
routers.post("/users", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Mohon isi name dan age" });
  }

  users.push({ username, password });
  res.status(200).json({
    message: "User berhasil ditambahkan",
    data: { username, password },
  });
});

routers.get("/assets", function (req, res) {
  const filename = "gojek.png";
  res.download(path.join(__dirname, "/download", filename), "gojek-photo.png");
});

// routers.post("/upload", upload.single("file"), (req, res) => {
//   res.send(req.file);
// });
routers.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Mohon unggah file" });
  }
  res.json({ message: "File berhasil diunggah", file: req.file });
});

routers.put("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex((data) => data.name.toLowerCase() === name);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Mohon isi data yang ingin diperbarui" });
  }

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json({ message: "User berhasil diperbarui", data: users[userIndex] });
});

routers.delete("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex((data) => data.name.toLowerCase() === name);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User berhasil dihapus" });
});
// routers.get("/download", function (req, res) {
//   const filename = "gojek.png";
//   res.sendFile(path.join(__dirname, "/download", filename), {
//     headers: {
//       "Content-Disposition": 'attachment; filename="gojek-photo.png',
//     },
//   });
// });

// routers.get("/download", function (req, res) {
//   const filename = "gojek.png";
//   res.download(path.join(__dirname, "/download", filename), "gojek-photo.png");
// });

// routers.get("/", (req, res) => res.send("Hello World"));
// routers.get("/login1", (req, res) => {
//   const { username, password } = req.body;
//   res.status(200).json({
//     status: "success",
//     data: {
//       username: username,
//       password: password,
//     },
//   });
// });
// routers.put("/login", (req, res) => {
//   const { username, password } = req.body;
//   res.status(200).json({
//     status: "success",
//     data: {
//       username: username,
//       password: password,
//     },
//   });
// });

module.exports = routers;
