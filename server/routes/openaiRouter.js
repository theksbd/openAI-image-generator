const express = require("express");
const router = express.Router();

const openaiController = require("../controllers/openaiController");

router.get("/", (req, res) => {
  res.json({ message: "Hello World from API Route" });
});

router.post("/generateImage", openaiController.generateImage);

module.exports = router;
