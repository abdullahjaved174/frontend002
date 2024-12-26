
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import ticktok from '../assets/ticktokbg.png';

const NavbarVariant2 = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
<AppBar
  position="static"
  sx={{
    background: "linear-gradient(135deg, #6a11cb, #2575fc)", 
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Added subtle box shadow
    color: "#fff",
    padding: "0 20px",
  }}
>
  <Toolbar sx={{ justifyContent: "center", height: 70 }}>
    <IconButton edge="start" component={Link} to="/">
      <img src={ticktok} alt="TikTok" style={{ height: "80px" }} />
    </IconButton>
    <Box sx={{ position: "absolute", right: 20 }}>
      {user ? (
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: "#222",
            color: "#fff",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)", // Subtle box shadow on hover
            '&:hover': { backgroundColor: "#333" },
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            component={Link}
            to="/login"
            sx={{
              border: "1px solid white",
              color: "white",
              boxShadow: "0 3px 8px rgba(255, 255, 255, 0.1)", // Subtle box shadow on hover
              '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={{
              backgroundColor: "#222",
              color: "#fff",
              marginLeft: 1,
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Subtle box shadow on hover
              '&:hover': { backgroundColor: "#444" },
            }}
          >
            Register
          </Button>
        </>
      )}
    </Box>
  </Toolbar>
</AppBar>

  );
};

export default NavbarVariant2;
