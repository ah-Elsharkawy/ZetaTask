import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser, currentUser } = useUser();

  let handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
        </Typography>
        {location.pathname !== "/login" && currentUser == null && (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
        {location.pathname !== "/register" && (
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
        )}
        {location.pathname !== "/favourites" && (
          <Button color="inherit" onClick={() => navigate("/favourites")}>
            Favourites
          </Button>
        )}

        {currentUser !== null && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
