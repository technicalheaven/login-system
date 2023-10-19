import express from "express";
import { initDB } from "./database/connection";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  initDB();
});
