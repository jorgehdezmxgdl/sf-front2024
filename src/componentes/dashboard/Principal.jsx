import React from 'react';
import { Grid, Paper, Typography, Card, CardContent, Tabs, Tab, CardMedia } from '@mui/material';

const Principal = () => {
    const modules = [
        {
          name: 'COMPRAS',
          tasks: ['PROVEEDORES', 'CATALOGO', 'REQUISICIONES DE COMPRA', 'ORDENES DE COMPRA', 'LICITACIONES', 'IMPORTACIONES', 'LISTAS DE COSTO', 'REPORTES DE COMPRA']
        },
        {
          name: 'INSUMOS',
          tasks: ['PROVEEDORES', 'CATALOGO', 'REQUISICION DE COMPRA', 'ORDEN DE COMPRA', 'LISTAS DE COSTO', 'INVENTARIO', 'REPORTES']
        },
        // Añade más módulos según sea necesario
      ];
      
  const [selectedModule, setSelectedModule] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedModule(newValue);
  };

  return (
    <div>
    <Tabs value={selectedModule} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
      {modules.map((module, index) => (
        <Tab label={module.name} key={index} />
      ))}
    </Tabs>
    <Grid container spacing={3} style={{ marginTop: 16 }}>
      {modules[selectedModule].tasks.map((task, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={task.image}
              alt={task.name}
            />
            <CardContent>
              <Typography variant="h6">{task.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  );
};

export default Principal;
