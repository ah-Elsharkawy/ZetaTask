const express = require("express");
const router = express.Router();

const {
  addImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage,
} = require("../Controllers/imageController");

router.route("/").get(getImages).post(addImage);

router.route("/:id").get(getImageById).patch(updateImage).delete(deleteImage);

module.exports = router;
