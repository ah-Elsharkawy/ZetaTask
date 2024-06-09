import React from "react";
import { Grid } from "@mui/material";
import ImageCard from "./ImageCard";

const ImageGrid = ({ photos }) => {
  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
          <ImageCard
            imageUrl={photo.src.original}
            title={photo.alt}
            onAddToFavorites={() => {
              alert("Added to favorites from the grid!");
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGrid;
