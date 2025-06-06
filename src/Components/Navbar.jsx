import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../ContextPage/MyContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.email) {
      console.log("Logging out user:", userData.email);
    }

    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Home
          </Typography>

          <Button color="inherit" component={Link} to="/getuser">
            User
          </Button>

          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar
                alt={user.name}
                src={user.picture}
                sx={{ ml: 2, width: 32, height: 32 }}
              />
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
