import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import BusinessIcon from "@mui/icons-material/Business";
import milogo from "../login//milogo.png";
import ListItemButton from "@mui/material/ListItemButton";
import Empresa from "../empresa/Empresa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuConfig from "../configuracion/MenuConf";

const drawerWidth = 240;

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(0);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuColaborador = () => {
    handleCloseMenu();
    setShow(1);
  };


  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          {/* Replace this part with an img tag */}
          <MailIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Rest of the Drawer content */}
        <img src={milogo} alt="milogo" width="100%" />
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <ArrowDropDownIcon />
              </ListItemIcon>
              <ListItemText primary="Recursos Humanos" />
            </ListItemButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleMenuColaborador}>Colaboradores</MenuItem>
            </Menu>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración" onClick={() => setShow(2)}  />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: 3, marginTop: "64px" }}>
         {show === 1 ? <Empresa /> : show === 2 ? <MenuConfig /> : null}
      </main>
    </div>
  );
}

export default App;
