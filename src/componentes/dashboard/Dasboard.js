import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  Drawer,
  IconButton,
} from "@mui/material";
import milogo from "../login/milogo.png";
import Empresa from "../empresa/Empresa";
import MenuConfig from "../configuracion/MenuConf";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import Nested from "./Nested";
import Proveedor from "../compras/Proveedor";
import Catalogo from "../compras/Catalogo";
import Requisicion from "../compras/Requisicion";
import Compra from "../compras/Compra";
import Visor from "../utilities/Visor";
import DataGeneral from "./DataGeneral";
import Licitaciones from "../compras/Licitaciones";
import Reportes from '../compras/Reportes';
import Principal from "./Principal";
import InventarioAlmacen from "../inventario/almacenes";
import InventoryManagement from "../inventario/ajustes";
import Kardex from "../inventario/kardex";
import StorageBlocks from "../inventario/localidades";
import PerfumeInventoryOverview from "../inventario/InvGeneral";
import InventoryDashboard from "../inventario/Graficos";

const drawerWidth = 240;

export default function App() {
  const [show, setShow] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const ComponentMap = {
    0: DataGeneral,
    1: Empresa,
    2: MenuConfig,
    3: Proveedor,
    4: Catalogo,
    5: Requisicion,
    6: Compra,
    7: Visor,
    8: Licitaciones,
    9: Reportes,
    11: InventarioAlmacen, 
    12: InventoryManagement,
    13: Kardex,
    14: StorageBlocks,
    15: PerfumeInventoryOverview,
    16: InventoryDashboard
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
