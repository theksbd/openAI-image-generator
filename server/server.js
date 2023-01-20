require("dotenv").config();

const express = require("express");
const app = express();

const openaiRouter = require("./routes/openaiRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World from server.js" });
});

app.use("/api", openaiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
