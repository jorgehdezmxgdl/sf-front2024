import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
} from '@mui/material';

// Datos de ejemplo para los perfumes
const initialPerfumes = [
  { id: 1, name: 'Eau de Parfum Floral', locations: ['Estante A', 'Tienda Central'], available: 50, reserved: 10, deficit: 0 },
  { id: 2, name: 'Cologne Citrus Fresh', locations: ['Estante B', 'Tienda Norte'], available: 30, reserved: 5, deficit: 15 },
  { id: 3, name: 'Perfume Oriental Spice', locations: ['Estante C'], available: 20, reserved: 8, deficit: 22 },
  { id: 4, name: 'Eau de Toilette Woody', locations: ['Estante A', 'Tienda Sur'], available: 40, reserved: 12, deficit: 0 },
  { id: 5, name: 'Perfume Gourmand Sweet', locations: ['Estante D', 'Tienda Central'], available: 15, reserved: 3, deficit: 32 },
];

function PerfumeInventoryOverview() {
  const [perfumes, setPerfumes] = useState(initialPerfumes);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar perfumes basado en el término de búsqueda
  const filteredPerfumes = perfumes.filter(perfume =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Resumen de Inventario de Perfumes
      </Typography>
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar Perfume"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Perfume</TableCell>
              <TableCell>Ubicaciones</TableCell>
              <TableCell align="right">Piezas Disponibles</TableCell>
              <TableCell align="right">Piezas Apartadas</TableCell>
              <TableCell align="right">Déficit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPerfumes.map((perfume) => (
              <TableRow key={perfume.id}>
                <TableCell component="th" scope="row">
                  {perfume.name}
                </TableCell>
                <TableCell>{perfume.locations.join(', ')}</TableCell>
                <TableCell align="right">{perfume.available}</TableCell>
                <TableCell align="right">{perfume.reserved}</TableCell>
                <TableCell 
                  align="right"
                  style={{ color: perfume.deficit > 0 ? 'red' : 'inherit' }}
                >
                  {perfume.deficit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PerfumeInventoryOverview;