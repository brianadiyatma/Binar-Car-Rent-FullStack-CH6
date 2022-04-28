const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  });
