import React from "react";
import { styled } from "@mui/system";
import { Card, CardActions, CardMedia, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledCard = styled(Card)({
  maxWidth: 300,
  margin: "auto",
});

const StyledCardMedia = styled(CardMedia)({
  height: 400,
});

const CenteredCardActions = styled(CardActions)({
  justifyContent: "center",
});

const ImageCard = ({
  imageUrl,
  title,
  onAddToFavorites,
  inFavourites = false,
}) => {
  return (
    <StyledCard>
      <StyledCardMedia image={imageUrl} title={title} />
      <CenteredCardActions>
        <Button size="small" color="primary" onClick={onAddToFavorites}>
          <FavoriteIcon /> Add to Favorites
        </Button>
        {inFavourites && (
          <Button size="small" color="secondary">
            Remove from Favorites
          </Button>
        )}
      </CenteredCardActions>
    </StyledCard>
  );
};

export default ImageCard;
