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
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LevantaRequisicion(props) {
  const [open, setOpen] = React.useState(true);
  const [totalPurchase, setTotalPurchase] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleAddRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const updatedRows = [...rows, { id: newId, ...newRow, quantity: parseFloat(newRow.quantity), price: parseFloat(newRow.price) }];
    setRows(updatedRows);
    updateTotalPurchase(updatedRows);
    setNewRow({ name: '', quantity: '', price: '' });
  };

  const updateTotalPurchase = (updatedRows) => {
    const total = updatedRows.reduce((sum, row) => sum + row.quantity * row.price, 0);
    setTotalPurchase(total);
  };

  const handleEditCellChange = (params) => {
    const { id, field, props } = params;
    if (props.error) return;
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: props.value } : row));
    setRows(updatedRows);
    updateTotalPurchase(updatedRows);
  };

  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setRows(updatedRows);
    updateTotalPurchase(updatedRows);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Nombre del Producto",
      width: 400,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      width: 90,
      editable: true,
      type: "number",
    },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
      editable: true,
      type: "number",
      renderCell: (params) => formatCurrency(params.value)
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 90,
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

  return (
    <Dialog
      open={open}
      maxWidth={"lg"}
      fullWidth={true}
      onClose={handleClose}
      fullScreen={fullScreen}
    >
      <DialogTitle id={"id11"} sx={{ bgcolor: '#1976D2', color: 'white' }}>
          Alta de nuevo producto
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Completa la siguiente información
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box height={400}>
                <DataGrid
                  height={650}
                  width={850}
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
            <Grid item xs={4}>
              <Box display="flex" flexDirection="column" gap="16px">
                <TextField
                  label="Nombre del Producto"
                  value={newRow.name}
                  onChange={(e) =>
                    setNewRow({ ...newRow, name: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Cantidad"
                  type="number"
                  value={newRow.quantity}
                  onChange={(e) =>
                    setNewRow({ ...newRow, quantity: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Precio"
                  type="number"
                  value={newRow.price}
                  onChange={(e) =>
                    setNewRow({ ...newRow, price: e.target.value })
                  }
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddRow}
                >
                  Añadir Producto
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ bgcolor: '#CFD8DC' }}>
        <Button onClick={handleClose} sx={{ bgcolor: '#455A64', color: '#FFFFFF', '&:hover': { bgcolor: '#37474F' } }}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
