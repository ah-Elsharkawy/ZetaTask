import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import ImageCard from "./components/Image/ImageCard";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ImageGrid from "./components/Image/ImagesGrid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites/Favourites";
import Header from "./components/Home/Header";
import PuffLoader from "react-spinners/PuffLoader";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  // fetching photos from an API

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get("https://api.pexels.com/v1/curated", {
        headers: {
          Authorization:
            "rfIv70ZZPVuBJV4OCPU0rp3W48m1LmxKMdRBbAASiqzqZuv8gjtB5Nbf",
        },
      });
      setPhotos(response.data.photos);
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  if (photos.length === 0) {
    return <CircularProgress />;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ImageGrid photos={photos.map((photo) => photo.src.original)} />
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
