const db = require("../firebase/firebase");
const shorten_link = require("../utils/urlShortener");

// Create a new image

exports.addImage = async (req, res, next) => {
  try {
    req.body.url = await shorten_link(req.body.url);
    const newImageRef = await db.collection("Images").add(req.body);
    const newImage = await newImageRef.get();
    res.status(201).json({ id: newImage.id, ...newImage.data() });
  } catch (error) {
    next(error);
  }
};

// Get all images

exports.getImages = async (req, res, next) => {
  try {
    const querySnapshot = await db.collection("Images").get();
    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    res.json(images);
  } catch (error) {
    next(error);
  }
};

// Get a single image

exports.getImageById = async (req, res, next) => {
  try {
    const image = await db.collection("Images").doc(req.params.id).get();
    if (image.data()) {
      res.json({ id: image.id, ...image.data() });
    } else {
      res.status(404).json("Image not found");
    }
  } catch (error) {
    next(error);
  }
};

// Update an image
exports.updateImage = async (req, res, error) => {
  try {
    let image = await db.collection("Images").doc(req.params.id).get();
    if (!image.data()) {
      res.status(404).json("Image not found");
    }

    if (req.body.url) {
      req.body.url = await shorten_link(req.body.url);
    }

    await db.collection("Images").doc(req.params.id).update(req.body);

    image = await db.collection("Images").doc(req.params.id).get();

    res.json({ message: "Image updated", updatedImage: image.data() });
  } catch (error) {
    next(error);
  }
};

// Delete an image

exports.deleteImage = async (req, res, error) => {
  try {
    await db.collection("Images").doc(req.params.id).delete();
    res.json("Image deleted");
  } catch (error) {
    next(error);
  }
};
