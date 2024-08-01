import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const perfumesData = [
  { id: 1, name: 'Eau de Parfum Floral', currentStock: 75 },
  { id: 2, name: 'Cologne Citrus Fresh', currentStock: 50 },
  { id: 3, name: 'Perfume Oriental Spice', currentStock: 30 },
  { id: 4, name: 'Eau de Toilette Woody', currentStock: 60 },
  { id: 5, name: 'Perfume Gourmand Sweet', currentStock: 40 },
];

const movementsData = {
  1: [
    { id: 1, date: '2024-01-01', type: 'Compra', quantity: 100, location: 'Almacén Central', balance: 100 },
    { id: 2, date: '2024-01-15', type: 'Traslado', quantity: -50, location: 'Tienda A', balance: 50 },
    { id: 3, date: '2024-02-01', type: 'Venta', quantity: -25, location: 'Tienda A', balance: 25 },
  ],
  2: [
    { id: 1, date: '2024-01-05', type: 'Compra', quantity: 80, location: 'Almacén Central', balance: 80 },
    { id: 2, date: '2024-01-20', type: 'Traslado', quantity: -30, location: 'Tienda B', balance: 50 },
  ],
};

function Kardex() {
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const showMovements = (perfumeId) => {
    setSelectedPerfume(perfumeId);
  };

  const perfumeColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'currentStock', headerName: 'Stock Actual', width: 130, type: 'number' },
    {
      field: 'action',
      headerName: 'Acciones',
      width: 140,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => showMovements(params.row.id)}
        >
          Detalle
        </Button>
      ),
    },
  ];

  const movementColumns = [
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'quantity', headerName: 'Cantidad', width: 100, type: 'number' },
    { field: 'location', headerName: 'Ubicación', width: 150 },
    { field: 'balance', headerName: 'Saldo', width: 100, type: 'number' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Kardex de Perfumes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Listado de Perfumes
          </Typography>
          <DataGrid
            rows={perfumesData}
            columns={perfumeColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            disableSelectionOnClick
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Movimientos del Perfume
          </Typography>
          {selectedPerfume ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {perfumesData.find(p => p.id === selectedPerfume)?.name}
              </Typography>
              <DataGrid
                rows={movementsData[selectedPerfume] || []}
                columns={movementColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
              />
            </Box>
          ) : (
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Seleccione un perfume para ver sus movimientos</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Kardex;