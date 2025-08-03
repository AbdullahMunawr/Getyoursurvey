const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));

app.post("/upload", (req, res) => {
  const base64Image = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  const filename = `snapshot_${Date.now()}.jpg`;
  fs.writeFileSync(path.join(__dirname, "public", filename), base64Image, "base64");
  console.log("Received snapshot:", filename);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
