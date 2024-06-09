import React from "react";
import { styled } from "@mui/system";
import { Card, CardActions, CardMedia, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "../../context/UserContext";

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

const ImageCard = ({ imageUrl, inFavourites = false }) => {
  const { addToFavorites, removeFromFavorites } = useUser();
  return (
    <StyledCard>
      <StyledCardMedia image={imageUrl} />
      <CenteredCardActions>
        {!inFavourites && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              addToFavorites(imageUrl);
            }}
          >
            <FavoriteIcon /> add to favorites
          </Button>
        )}
        {inFavourites && (
          <Button
            size="small"
            color="secondary"
            style={{ color: "red" }}
            onClick={() => {
              removeFromFavorites(imageUrl);
            }}
          >
            <FavoriteIcon /> remove from favorites
          </Button>
        )}
      </CenteredCardActions>
    </StyledCard>
  );
};

export default ImageCard;
