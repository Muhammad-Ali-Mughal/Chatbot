import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="white"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
