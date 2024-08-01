import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const initialInventory = [
  { id: 1, name: 'Eau de Parfum Floral', stock: 50, price: 89.99 },
  { id: 2, name: 'Cologne Citrus Fresh', stock: 30, price: 69.99 },
  { id: 3, name: 'Perfume Oriental Spice', stock: 20, price: 109.99 },
];

function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', stock: '', price: '' });
  const [adjustDialog, setAdjustDialog] = useState(false);
  const [adjustmentDetails, setAdjustmentDetails] = useState({
    id: null,
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    reason: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.stock && newItem.price) {
      setInventory([...inventory, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', stock: '', price: '' });
      handleClose();
    }
  };

  const handleAdjustDialogOpen = (id) => {
    setAdjustmentDetails({ ...adjustmentDetails, id });
    setAdjustDialog(true);
  };

  const handleAdjustDialogClose = () => {
    setAdjustDialog(false);
    setAdjustmentDetails({ id: null, quantity: '', date: new Date().toISOString().split('T')[0], reason: '' });
  };

  const handleAdjustmentChange = (e) => {
    const { name, value } = e.target;
    setAdjustmentDetails({ ...adjustmentDetails, [name]: value });
  };

  const handleAdjustStock = () => {
    const { id, quantity, date, reason } = adjustmentDetails;
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + parseInt(quantity)) } : item
    ));
    console.log(`Ajuste realizado: ID ${id}, Cantidad ${quantity}, Fecha ${date}, Motivo: ${reason}`);
    handleAdjustDialogClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Gestión de Inventario de Perfumes
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Perfume</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Precio ($)</TableCell>
              <TableCell align="center">Ajustar Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="right">{row.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleAdjustDialogOpen(row.id)}>Ajustar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para añadir nuevo perfume */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir Nuevo Perfume</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre del Perfume"
            type="text"
            fullWidth
            variant="standard"
            value={newItem.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="stock"
            label="Stock Inicial"
            type="number"
            fullWidth
            variant="standard"
            value={newItem.stock}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Precio"
            type="number"
            fullWidth
            variant="standard"
            value={newItem.price}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddItem}>Añadir</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para ajustar stock */}
      <Dialog open={adjustDialog} onClose={handleAdjustDialogClose}>
        <DialogTitle>Ajustar Stock</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="quantity"
            label="Cantidad (use - para reducir)"
            type="number"
            fullWidth
            variant="standard"
            value={adjustmentDetails.quantity}
            onChange={handleAdjustmentChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Fecha"
            type="date"
            fullWidth
            variant="standard"
            value={adjustmentDetails.date}
            onChange={handleAdjustmentChange}
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="reason-label">Motivo</InputLabel>
            <Select
              labelId="reason-label"
              name="reason"
              value={adjustmentDetails.reason}
              onChange={handleAdjustmentChange}
              label="Motivo"
            >
              <MenuItem value="Venta">Transpaso</MenuItem>
              <MenuItem value="Devolución">Devolución</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdjustDialogClose}>Cancelar</Button>
          <Button onClick={handleAdjustStock}>Confirmar Ajuste</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default InventoryManagement;