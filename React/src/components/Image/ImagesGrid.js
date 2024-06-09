import React from "react";
import { Grid } from "@mui/material";
import ImageCard from "./ImageCard";
import { useUser } from "../../context/UserContext";

const ImageGrid = ({ photos }) => {
  const { favorites } = useUser();

  const isFavorite = (photoUrl) => {
    return favorites.includes(photoUrl);
  };
  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
          <ImageCard imageUrl={photo} inFavourites={isFavorite(photo)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGrid;
