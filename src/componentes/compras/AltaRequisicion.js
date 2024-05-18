import React from "react";
import Dialog from "@mui/material/Dialog";
import { DataGrid } from '@mui/x-data-grid';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button, Select, MenuItem } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';

export default function AltaRequisicion(props) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const initialRows = [
    { id: uuidv4(), name: 'Artículo 1', quantity: 1, price: 100 },
    { id: uuidv4(), name: 'Artículo 2', quantity: 2, price: 200 },
  ];

  const articleOptions = ['Artículo 1', 'Artículo 2', 'Artículo 3'];

  const [rows, setRows] = React.useState(initialRows);

  const handleEditCellChange = (params) => {
    const updatedRows = rows.map((row) =>
      row.id === params.id ? { ...row, [params.field]: params.value } : row
    );
    setRows(updatedRows);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAddRow = () => {
    setRows([...rows, { id: uuidv4(), name: '', quantity: 0, price: 0 }]);
  };

  const renderSelectEditInputCell = (params) => {
    return (
      <Select
        value={params.value}
        onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value })}
        autoFocus
        fullWidth
      >
        {articleOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre del Artículo',
      width: 200,
      editable: true,
      renderEditCell: renderSelectEditInputCell,
    },
    { field: 'quantity', headerName: 'Cantidad', type: 'number', width: 100, editable: true },
    { field: 'price', headerName: 'Precio', type: 'number', width: 100, editable: true },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteRow(params.id)}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  const handleClose = () => {
    setOpen(false);
    props.handleCloseDialog();
    setOpen(true);
  };

  
  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle id={"id11"}>Alta de nuevo producto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Completa la siguiente información
          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Agregar Fila
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            onEditCellChangeCommitted={handleEditCellChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
