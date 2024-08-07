import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaidIcon from '@mui/icons-material/Paid';
import ArticleIcon from '@mui/icons-material/Article';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublicIcon from '@mui/icons-material/Public';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import BusinessIcon from '@mui/icons-material/Business';
import FaceIcon from '@mui/icons-material/Face';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import DoorFrontIcon from '@mui/icons-material/DoorFront';

import StoreIcon from '@mui/icons-material/Store';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HistoryIcon from '@mui/icons-material/History';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

export default function Nested(props) {
  const [show, setShow]     = React.useState(0);

  const [openCC, setOpenCC] = React.useState(true);
  const [openRH, setOpenRH] = React.useState(true);
  const [openIV, setOpenIV] = React.useState(true);

  const handleClickCompras = () => {
    setOpenCC(!openCC);
  };

  const handleClickRH = () => {
      setOpenRH(!openRH); 
  };

  const handleClickIV = () => {
    setOpenIV(!openIV); 
};

  const handleHR_Personal = () => {
      props.handleShow(1);
  };

  const handleCompra_Proveedor = () => {
      props.handleShow(3);
  };

  const handleCompra_Catalogo = () => {
      props.handleShow(4);
  };

  const handleCompra_Requesiciones = () => {
      props.handleShow(5);
  };

  const handleCompra_Orden = () => {
    props.handleShow(6);
   
  };

  const handleImprimir = () => {
      props.handleShow(7);
  };

  const handleLicitaciones = () => {
    props.handleShow(8);
  };

  const handleReporteCompra = () => {
    props.handleShow(9);
  }

  const handleInventario01 = (numero) => {
    props.handleShow(numero);
  }
  
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menú Principal
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClickCompras}>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Compras" />
        {openCC ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCC} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" onClick={handleCompra_Proveedor}  />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Catálogo"  onClick={handleCompra_Catalogo}/>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Requisiciones" onClick={handleCompra_Requesiciones} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Órdenes de compra" onClick={handleCompra_Orden}/>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Licitaciones"  onClick={handleLicitaciones}/>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Importaciones" onClick={handleImprimir} />
          </ListItemButton>
        </List>
     
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de costos" />
          </ListItemButton>
        </List>
      
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StackedLineChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" onClick={handleReporteCompra} />
          </ListItemButton>
        </List>
      </Collapse>


      <ListItemButton onClick={handleClickIV}>
        <ListItemIcon>
          <StoreMallDirectoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventario" />
        {openIV ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIV} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Inventario por almacenes" onClick={() => handleInventario01(11)}  />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Ajustes de inventario"  onClick={() => handleInventario01(12)}/>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Kardex" onClick={() => handleInventario01(13)} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <EditRoadIcon />
            </ListItemIcon>
            <ListItemText primary="Localidades" onClick={() => handleInventario01(14)}/>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Inventario General"  onClick={() => handleInventario01(15)}/>
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StackedLineChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" onClick={() => handleInventario01(16)} />
          </ListItemButton>
        </List>
      </Collapse>



      <ListItemButton onClick={handleClickRH}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Recursos Humanos" />
        {openRH ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openRH} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Personal" onClick={handleHR_Personal} />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RoomPreferencesIcon />
            </ListItemIcon>
            <ListItemText primary="Otras áreas" />
          </ListItemButton>
        </List>     
      </Collapse>
      <ListItemButton>
        <ListItemIcon>
          <DoorFrontIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </List>
    
  );
}