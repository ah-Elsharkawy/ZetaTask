require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const db = require("./firebase");
const { default: axios } = require("axios");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "Images"));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  res.json(users);
});

(async () => {
  /* const querySnapshot = await db.collection("Images").get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  // insert a new document
  await db.collection("Images").doc("new-id").set({
    title: "New Image",
    url: "https://example.com",
  });

  // update a document

  await db.collection("Images").doc("1").update({
    title: "Oak tree",
  });

  // delete a document
  await db.collection("Images").doc("new-id").delete();

  // get document by id

  const doc = await db.collection("Images").doc("1").get();

  if (doc.data()) {
    console.log("Document data:", doc.data());
  } else {
    console.log("No such document!");
  } */

  // send axios request to this https://www.shareaholic.com/v2/share/shorten_link?apikey=8943b7fd64cd8b1770ff5affa9a9437b&url=https://images.immediate.co.uk/production/volatile/sites/10/2023/06/2048x1365-Oak-trees-SEO-GettyImages-90590330-b6bfe8b.jpg

  // get the shortened link

  axios
    .get(
      "https://www.shareaholic.com/v2/share/shorten_link?apikey=8943b7fd64cd8b1770ff5affa9a9437b&url=https://static01.nyt.com/images/2023/11/13/multimedia/13cli-trees-01-wpgf/13cli-trees-01-wpgf-videoSixteenByNine3000.jpg",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    )
    .then((response) => {
      console.log(response.data);
    });
})();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// error handling

app.use((req, res, next, err) => {
  console.log(err.message);
  res.status(500).send("Internal Server Error");
});

/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUXgh7uIR3AFYK5tTzO3965HBn9YXcWaI",
  authDomain: "zetaton-c9832.firebaseapp.com",
  projectId: "zetaton-c9832",
  storageBucket: "zetaton-c9832.appspot.com",
  messagingSenderId: "650685998366",
  appId: "1:650685998366:web:2e7d6a4607b5695a64950f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 */
