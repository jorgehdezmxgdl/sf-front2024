import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';


const topSellingPerfumes = [
  { name: 'Floral Bliss', male: 120, female: 200 },
  { name: 'Ocean Breeze', male: 150, female: 100 },
  { name: 'Citrus Burst', male: 100, female: 150 },
  { name: 'Woody Elegance', male: 180, female: 80 },
  { name: 'Sweet Vanilla', male: 60, female: 220 },
];

const returnsData = [
  { name: 'Defectuosos', value: 15 },
  { name: 'Insatisfacción', value: 25 },
  { name: 'Alergia', value: 10 },
  { name: 'Otros', value: 5 },
];

const damagedPerfumes = [
  { name: 'Rotos', value: 20 },
  { name: 'Evaporados', value: 15 },
  { name: 'Contaminados', value: 10 },
  { name: 'Caducados', value: 25 },
];

const inventoryTrends = [
  { month: 'Ene', inStock: 500, sold: 300 },
  { month: 'Feb', inStock: 550, sold: 320 },
  { month: 'Mar', inStock: 450, sold: 380 },
  { month: 'Abr', inStock: 600, sold: 400 },
  { month: 'May', inStock: 550, sold: 450 },
  { month: 'Jun', inStock: 700, sold: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function InventoryDashboard() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Dashboard de Inventario de Perfumes
      </Typography>
      <Grid container spacing={3}>
        {/* Gráfico de perfumes más vendidos por género */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Perfumes más vendidos por género
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topSellingPerfumes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" fill="#8884d8" name="Masculino" />
                  <Bar dataKey="female" fill="#82ca9d" name="Femenino" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de devoluciones */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Motivos de Devoluciones
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={returnsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {returnsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de perfumes dañados */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Perfumes Dañados
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={damagedPerfumes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {damagedPerfumes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de tendencias de inventario */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Tendencias de Inventario
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inStock" fill="#8884d8" name="En Stock" />
                  <Bar dataKey="sold" fill="#82ca9d" name="Vendidos" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InventoryDashboard;