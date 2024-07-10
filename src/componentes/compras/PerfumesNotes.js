import React from 'react';
import { Checkbox, TextField, Autocomplete } from '@mui/material';
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Paper } from '@mui/material';

import { styled } from '@mui/system';

import axios from 'axios';

import naranja from '../../imgs/icons8-naranja.png';

export default function PerfumeNotes() {
  const [options, setOptions] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5784/v1/compras/notasolfativas`);
        const data = response.data;
        setOptions(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    fetchData();
  }, []);

  const GroupHeader = styled('div')({
    backgroundColor: '#8d4925',
    color: 'white',
    padding: '2px',
  });

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Accordion defaultExpanded sx={{ borderRadius: 2, backgroundColor: 'primary.main' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: 'primary.main', color: 'white' }}
        >
            <Typography>Notas de Salida</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Box component="img"
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                    alt="Imagen de notas de salida"
                    src={naranja}
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de salida son las primeras notas que se perciben al aplicar el perfume.</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Son muy volátiles y suelen evaporarse en los primeros 5-15 minutos.</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Componentes típicos:</strong> Frecuentemente incluyen ingredientes frescos y ligeros como cítricos, frutas frescas, hierbas y algunas especias.</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Su función principal es causar una primera impresión atractiva e inmediata.</Typography>

                </Paper>
              </Grid>
              {/* Segunda fila con una columna */}
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Autocomplete
                    multiple
                    options={options}
                    groupBy={(option) => option.categoria}
                    getOptionLabel={(option) => option.nombre}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.nombre}
                      </li>
                    )}
                    renderGroup={(params) => (
                      <li key={params.key}>
                        <GroupHeader>{params.group}</GroupHeader>
                        <ul style={{ padding: 0 }}>{params.children}</ul>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params}
                        variant="outlined"
                        label="Seleccione..."
                        placeholder="Seleccione..."
                        margin="normal"
                        fullWidth
                      />
                    )}
                    value={selectedOptions}
                    onChange={(event, newValue) => {
                      setSelectedOptions(newValue);
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ borderRadius: 2, backgroundColor: 'primary.main' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ backgroundColor: 'secondary.main', color: 'white' }}
        >
            <Typography>Notas de Corazón</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de corazón aparecen una vez que las notas de salida se desvanecen y forman el núcleo de la fragancia.</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Pueden durar varias horas, normalmente de 2 a 4 horas.</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Componentes típicos:</strong> Suelen incluir flores, especias y notas frutales más densas.</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Estabilizan las notas de salida y preparan el camino para las notas de fondo.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ borderRadius: 2, backgroundColor: 'primary.main' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          sx={{ backgroundColor: 'secondary.main', color: 'white' }}
        >
            <Typography>Notas de Fondo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de fondo son las notas que se perciben al final y son las que más perduran en la piel.</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Pueden durar muchas horas, incluso hasta un día entero.</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Componentes típicos:</strong> Incluyen ingredientes pesados y duraderos como maderas, resinas, ámbar, vainilla, almizcle y algunos bálsamos.</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Añaden profundidad y solidez a la fragancia.</Typography>

          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
