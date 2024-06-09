import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import ImageCard from "./components/Image/ImageCard";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ImageGrid from "./components/Image/ImagesGrid";
import { useEffect, useState } from "react";

function App() {
  const onAddToFavorites = () => {
    alert("Added to favorites!");
  };

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
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>React App</h1>

      {/* <ImageCard
        imageUrl={photos[0].src.original}
        title={photos[0].alt}
        onAddToFavorites={onAddToFavorites}
      /> */}
      {/* <ImageGrid photos={photos} /> */}
      <SignUp />
    </div>
  );
}

export default App;
