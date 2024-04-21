const express = require("express");
const dotenv = require("dotenv");
const router = require("./router/blogRouter");
const urouter = require("./router/userRouter");
const cors = require("cors");
const connectDB = require("./lib/db");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use("/", router);
app.use("/", urouter);

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
});
