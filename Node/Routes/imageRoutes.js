const express = require("express");
const {
  idValidation,
  addImageValidation,
  updateImageValidation,
} = require("../Middlewares/validations/imageValidation");
const validate = require("../Middlewares/validations/validator");
const router = express.Router();

const {
  addImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage,
} = require("../Controllers/imageController");

router.route("/").get(getImages).post(addImageValidation, validate, addImage);

router
  .route("/:id")
  .all(idValidation, validate)
  .get(getImageById)
  .patch(updateImageValidation, validate, updateImage)
  .delete(deleteImage);

module.exports = router;
