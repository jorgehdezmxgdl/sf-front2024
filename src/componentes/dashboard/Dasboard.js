import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ListSubheader from "@mui/material/ListSubheader";
import BusinessIcon from "@mui/icons-material/Business";
import milogo from "../login//milogo.png";
import ListItemButton from "@mui/material/ListItemButton";
import Empresa from "../empresa/Empresa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuConfig from "../configuracion/MenuConf";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Nested from "./Nested";
import Proveedor from "../compras/Proveedor";
import Catalogo from "../compras/Catalogo";

const drawerWidth = 240;

export default function App() {
  const [show, setShow] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const ComponentMap = {
    1: Empresa,
    2: MenuConfig,
    3: Proveedor,
    4: Catalogo,
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const ComponentToShow = ComponentMap[show] || null;

  const handleMenuColaborador = () => {
    setShow(1);
    setDrawerOpen(false);
  };

  const handleShow = (opcion) => {
    setShow(opcion);
    setDrawerOpen(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sólo Fragancias
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary" 
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <img src={milogo} alt="milogo" width="100%" />
        <Nested handleShow={handleShow} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          transition: 'margin-left 0.3s',
          width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
        }}
      >
        {ComponentToShow ? <ComponentToShow /> : null}
      </Box>
    </div>
  );
}
