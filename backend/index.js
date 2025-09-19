
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const cors=require("cors");

app.use(cors());

const photographerRoutes = require("./routes/photographers");

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.use(express.json());
app.use("/api/photographers", photographerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
