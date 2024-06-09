import ImageGrid from "../Image/ImagesGrid";
const { useUser } = require("../../context/UserContext");
const Favourites = () => {
  const { favorites } = useUser();
  console.log(favorites);
  return <ImageGrid photos={favorites} />;
};

export default Favourites;
