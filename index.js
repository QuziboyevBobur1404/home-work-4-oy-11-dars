const express = require("express");
const cors = require("cors");
const productRouter = require("./router/todo.routes");
const authRouter = require("./router/auth.routes");
const superadminRouter = require("./router/superadmin.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/", res.status(200).json({
  message: "render ishladi"
}))
app.use(productRouter);
app.use(authRouter);
app.use(superadminRouter)

app.listen(PORT, () => {
  console.log("Server is runing at", PORT);
});
