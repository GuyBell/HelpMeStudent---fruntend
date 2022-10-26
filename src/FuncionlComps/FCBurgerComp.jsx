import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import MenuIcon from "@mui/icons-material/Menu";
import PasswordIcon from "@mui/icons-material/Password";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function FCBurgerComp({ userDetails, type }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logOut = () => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
    navigate("/");
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {type !== "super" ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/notificationsTagsForStudent", { state: userDetails })}
              >
                <ListItemIcon>
                  <NotificationAddIcon />
                </ListItemIcon>
                <ListItemText primary="התראות" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/newPasswordPage", { state: { userDetails, type: "student" } })}
              >
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText primary="שינוי סיסמה" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/bestToTeach", { state: userDetails })}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="?מה מומלץ ללמד" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/newPasswordPage", { state: { userDetails, type: "super" } })}
              >
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText primary="שינוי סיסמה" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => logOut()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="התנתק" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div
      style={{ direction: "rtl", position: "fixed", top: "1%", right: "1%" }}
    >
      <Button
        onClick={toggleDrawer("right", true)}
        variant="contained"
        style={{ backgroundColor: "#00417E" }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
