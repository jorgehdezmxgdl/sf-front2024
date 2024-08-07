import React from "react";
import Dialog from "@mui/material/Dialog";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Grid,
  Tooltip,
  Typography,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import BuscaProveedor from "./BuscaProveedor";

export default function LevantaRequisicion(props) {
  const [open, setOpen] = React.useState(true);
  const [totalPurchase, setTotalPurchase] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [listado, setListado] = React.useState([]);
  const [value, setValue] = React.useState("1");
  const [autocompleteValue, setAutocompleteValue] = React.useState(null);
  let   valor = 0;	

  function isObject(variable) {
    return variable !== null && typeof variable === 'object';
  }
  const handleAutocompleteChange = (event, newValue) => {
    if (isObject(newValue)) {
      setAutocompleteValue(newValue.label);
      setNewRow({
        ...newRow,
        name: newValue.label,
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleCloseDialog();
    setOpen(true);
  };

  const [rows, setRows] = React.useState([]);
  const [newRow, setNewRow] = React.useState({
    name: "",
    quantity: "",
    price: "",
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5784/disenador2");
      setListado(response.data || []);
    } catch (error) {
      console.error("Error al buscar datos:", error);
    }
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const updatedRows = [
      ...rows,
      {
        id: newId,
        ...newRow,
        quantity: parseFloat(newRow.quantity),
        price: parseFloat(newRow.price),
        name: autocompleteValue,
      },
    ];
    setRows(updatedRows);
    updateTotalPurchase(updatedRows);
    setNewRow({ name: "", quantity: "", price: "" });
    setAutocompleteValue("");
  };

  const updateTotalPurchase = (updatedRows) => {
    const total = updatedRows.reduce(
      (sum, row) => sum + row.quantity * row.price,
      0
    );
    setTotalPurchase(total);
  };

  const handleEditCellChange = (params) => {
    const { id, field, props } = params;
    if (props.error) return;
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: props.value } : row
    );
    setRows(updatedRows);
    updateTotalPurchase(updatedRows);
  };

  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    updateTotalPurchase(updatedRows);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Nombre del Producto",
      width: 600,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      width: 130,
      editable: true,
      type: "number",
    },
    {
      field: "price",
      headerName: "Precio",
      width: 130,
      editable: true,
      type: "number",
      renderCell: (params) => formatCurrency(params.value),
    },
    {
      field: "actions",
      headerName: "Acción",
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Tooltip title="Eliminar">
            <GridActionsCellItem
              icon={<DeleteIcon sx={{ color: "red" }} />}
              label="Delete"
              onClick={() => handleDeleteRow(params.id)}
            />
          </Tooltip>
        </Box>
      ),
    },
  ];

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleCloseOpen2 = () => {
    setOpen2(false);
  };

  return (
    <>
      <Dialog
        open={open}
        maxWidth={"lg"}
        fullWidth={true}
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        <DialogTitle id={"id11"} sx={{ bgcolor: "#865645", color: "white" }}>
          Alta de nueva Requisición
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Productos para adquirir" value="1" />
                    <Tab label="Observaciones" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box style={{ flexGrow: 1 }}>
                        <Button onClick={handleClickOpen2}>
                          <AddIcon />
                        </Button>
                        <DataGrid
                          style={{ height: '100%', width: '100%' }}
                          rows={rows}
                          columns={columns}
                          editMode="row"
                          onEditCellChangeCommitted={handleEditCellChange}
                          onCellEditCommit={handleCellEditCommit}
                          autoHeight
                          disableSelectionOnClick
                        />
                      </Box>
                      <Box display="flex" justifyContent="flex-end" padding={2}>
                        <Typography variant="h6">
                          Total de la compra: ${totalPurchase.toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="2">Proveedor</TabPanel>
                <TabPanel value="3">Observaciones</TabPanel>
              </TabContext>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#CFD8DC" }}>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "#455A64",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "#37474F" },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      {open2 && <BuscaProveedor handleCloseOpen2={handleCloseOpen2} open2={open2} />}
    </>  
  );
}
