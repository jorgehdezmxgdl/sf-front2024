import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Calendario from '../utilities/Calendario';
import ListaEventos from './ListaEventos';
import Avisos from './Avisos';
import Cards from '../utilities/Cards';

function DataGeneral() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const eventos = [
    { title: 'Evento 1', time: '10:00 AM' },
    { title: 'Evento 2', time: '02:00 PM' },
  ];
  const avisos = ['Nuevo producto A', 'Mensaje directo de usuario X'];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Grid container>
        <Grid item xs={3} sx={{ padding: 2 }}>
          <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <Divider>Eventos/Actividades</Divider>
          <ListaEventos eventos={eventos} />
        </Grid>
        <Grid item xs={9} sx={{ borderRight: '1px solid #ddd', padding: 2 }}>
          <Grid
            container
            spacing={1}
            item xs={4}
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          >
            <Cards />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DataGeneral;