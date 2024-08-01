import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';


const initialShelves = [
  { id: 1, name: 'Estante A-001-A', capacity: 50, currentStock: 30 },
  { id: 2, name: 'Estante A-001-B', capacity: 40, currentStock: 35 },
  { id: 3, name: 'Estante A-001-C', capacity: 60, currentStock: 45 },
  { id: 4, name: 'Estante A-001-D', capacity: 30, currentStock: 20 },
  { id: 5, name: 'Rack A-002-A', capacity: 70, currentStock: 50 },
  { id: 6, name: 'Rack A-003 B', capacity: 45, currentStock: 40 },
];

function StorageBlocks() {
  const [shelves, setShelves] = useState(initialShelves);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [newStock, setNewStock] = useState('');

  const handleOpenDialog = (shelf) => {
    setSelectedShelf(shelf);
    setNewStock(shelf.currentStock.toString());
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShelf(null);
    setNewStock('');
  };

  const handleUpdateStock = () => {
    const updatedShelves = shelves.map(shelf => 
      shelf.id === selectedShelf.id 
        ? { ...shelf, currentStock: parseInt(newStock, 10) } 
        : shelf
    );
    setShelves(updatedShelves);
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Almacenamiento de Perfumes
      </Typography>
      <Grid container spacing={3}>
        {shelves.map((shelf) => (
          <Grid item xs={12} sm={6} md={4} key={shelf.id}>
            <Paper 
              elevation={3} 
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="h6">{shelf.name}</Typography>
                <Typography variant="body1">
                  Capacidad: {shelf.capacity} piezas
                </Typography>
                <Typography variant="body1">
                  Stock Actual: {shelf.currentStock} piezas
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  mt: 2, 
                  width: '100%', 
                  height: 20, 
                  backgroundColor: '#e0e0e0',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    width: `${(shelf.currentStock / shelf.capacity) * 100}%`,
                    height: '100%',
                    backgroundColor: 
                      shelf.currentStock > shelf.capacity * 0.9 ? 'error.main' :
                      shelf.currentStock > shelf.capacity * 0.7 ? 'warning.main' :
                      'success.main',
                  }}
                />
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => handleOpenDialog(shelf)}
              >
                Actualizar Stock
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Actualizar Stock de {selectedShelf?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nuevo Stock"
            type="number"
            fullWidth
            variant="standard"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            inputProps={{ min: 0, max: selectedShelf?.capacity }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleUpdateStock}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StorageBlocks;