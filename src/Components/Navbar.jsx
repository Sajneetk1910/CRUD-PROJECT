import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="">
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
              {" "}
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
            <Button
              color="inherit"
              component={Link}
              to="/getuser"
              sx={{ FontSize: 30 }}
            >
              User
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ FontSize: 30 }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
