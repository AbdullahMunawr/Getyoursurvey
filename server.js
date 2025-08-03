const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));

// Ensure "public" folder exists
if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}

app.post("/upload", (req, res) => {
  const { image } = req.body;

  if (!image) return res.status(400).send("No image data received.");

  const base64Image = image.replace(/^data:image\/jpeg;base64,/, "");
  const filename = `snapshot_${Date.now()}.jpg`;
  const filePath = path.join(__dirname, "public", filename);

  fs.writeFile(filePath, base64Image, "base64", (err) => {
    if (err) {
      console.error("Failed to save image:", err);
      return res.sendStatus(500);
    }
    console.log("Saved snapshot:", filename);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
