require("dotenv").config();

const express = require("express");
const cors = require("cors");
const imageRoutes = require("./Routes/imageRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", imageRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// error handling

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({ message: error + "" });
});
