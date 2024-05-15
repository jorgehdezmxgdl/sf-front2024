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

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Nested from "./Nested";
import Proveedor from "../compras/Proveedor";

const drawerWidth = 240;

function App() {
  const [show, setShow] = useState(0);

  const handleMenuColaborador = () => {
    setShow(1);
  };

  const handleShow = (opcion) => {
    setShow(opcion);
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
        <Nested handleShow={handleShow} />
      </Drawer>
      <main style={{ flexGrow: 1, padding: 3, marginTop: "64px" }}>
        {show === 1 ? <Empresa /> : show === 2 ? <MenuConfig /> : <Proveedor />}
      </main>
    </div>
  );
}

export default App;
