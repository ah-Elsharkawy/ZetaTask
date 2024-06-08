const { body, param } = require("express-validator");

let addImageValidation = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be a string")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title should be between 1 and 255 characters"),
  body("url")
    .exists()
    .withMessage("URL is required")
    .isString()
    .withMessage("URL should be a string")
    .isURL()
    .withMessage("URL should be a valid URL"),
];

let updateImageValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title should be a string")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title should be between 1 and 255 characters"),
  body("url")
    .optional()
    .isString()
    .withMessage("URL should be a string")
    .isURL()
    .withMessage("URL should be a valid URL"),
];

let idValidation = [param("id").exists().withMessage("Id is required")];

module.exports = {
  addImageValidation,
  updateImageValidation,
  idValidation,
};
