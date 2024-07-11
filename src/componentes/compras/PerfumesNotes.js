import React from 'react';
import { Checkbox, TextField, Autocomplete } from '@mui/material';
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Link } from '@mui/material';

import { styled } from '@mui/system';

import axios from 'axios';

import naranja from '../../imgs/icons8-naranja.png';
import flor from '../../imgs/icons8-flores.png';
import madera from '../../imgs/icons8-arbol.png';


export default function PerfumeNotes(props) {
  const [options, setOptions]                   = React.useState([]);
  const [selectedOptions, setSelectedOptions]   = React.useState([]);
  const [selectedOptions1, setSelectedOptions1] = React.useState([]);
  const [selectedOptions2, setSelectedOptions2] = React.useState([]);
  const [open, setOpen]                         = React.useState(false);
  const [muestra, setMuestra]                   = React.useState(0);
  const [titulo, setTitulo]                     = React.useState('');

  const GroupHeader = styled('div')({
    backgroundColor: '#8d4925',
    color: 'white',
    padding: '2px',
  });

  const handleOpenDialog = (opcion, mensaje) => {
    setMuestra(opcion);
    setTitulo(mensaje);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

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

  const handleNotaCorazon = (dato) => {
    props.handleNotaCorazon(dato);
  };

  const handleNotaFondo = (dato) => {
    props.handleNotaFondo(dato);
  };

  const handleNotaSalida = (dato) => {
    props.handleNotaSalida(dato);
  };


  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Accordion sx={{ borderRadius: 2 }} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Notas de Salida</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="img"
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                  alt="Imagen de notas de salida"
                  src={naranja}
                />
                <Typography variant="subtitle2" gutterBottom>
                  <Link
                    onClick={() => handleOpenDialog(1, "Notas de Salida")}
                    variant="body1"
                    underline="hover"
                    rel="noopener" sx={{ cursor: 'pointer' }}
                  >
                    Detalles
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={9}>
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
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ borderRadius: 2 }}  >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Notas de Corazón</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="img"
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                  alt="Imagen de notas de corazon"
                  src={flor}
                />
                <Typography variant="subtitle2" gutterBottom>
                  <Link
                    onClick={() => handleOpenDialog(2, "Notas de Corazón")}
                    variant="body1"
                    underline="hover"
                    rel="noopener" sx={{ cursor: 'pointer' }}
                  >
                    Detalles
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={9}>
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
                  value={selectedOptions1}
                  onChange={(event, newValue) => {
                    setSelectedOptions1(newValue);
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ borderRadius: 2 }} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Notas de Fondo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="img"
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                  alt="Imagen de notas de fondo"
                  src={madera}
                />
                <Typography variant="subtitle2" gutterBottom>
                  <Link
                    onClick={() => handleOpenDialog(3, "Notas de Fondo")}
                    variant="body1"
                    underline="hover"
                    rel="noopener" sx={{ cursor: 'pointer' }}
                  >
                    Detalles
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={9}>
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
                  value={selectedOptions2}
                  onChange={(event, newValue) => {
                    setSelectedOptions2(newValue);
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby={"informativo"}>
        <DialogTitle id={"info"}>
          Información detallada de <strong>{titulo}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {muestra === 1 ?
              <div>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de salida son las primeras notas que se perciben al aplicar el perfume.</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Son muy volátiles y suelen evaporarse en los primeros 5-15 minutos.</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Componentes típicos:</strong> Frecuentemente incluyen ingredientes frescos y ligeros como cítricos, frutas frescas, hierbas y algunas especias.</Typography>
                  <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Su función principal es causar una primera impresión atractiva e inmediata.</Typography>
                </Paper>
              </div>
              : muestra === 2 ?
                <div>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de corazón aparecen una vez que las notas de salida se desvanecen y forman el núcleo de la fragancia.</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Pueden durar varias horas, normalmente de 2 a 4 horas.</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Componentes típicos:</strong> Suelen incluir flores, especias y notas frutales más densas.</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Estabilizan las notas de salida y preparan el camino para las notas de fondo.</Typography>      <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Su función es dar cuerpo y carácter al perfume, y suelen ser las notas más notables y duraderas.</Typography>
                  </Paper>
                </div>
                : muestra === 3 ?
                  <div>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                      <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de fondo son las notas que se perciben al final y son las que más perduran en la piel.</Typography>
                      <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Pueden durar muchas horas, incluso hasta un día entero.</Typography>
                      <Typography variant="subtitle1" gutterBottom><strong>Componentes típicos:</strong> Incluyen ingredientes pesados y duraderos como maderas, resinas, ámbar, vainilla, almizcle y algunos bálsamos.</Typography>
                      <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Añaden profundidad y solidez a la fragancia.</Typography>
                    </Paper>
                  </div>
                  : null
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
