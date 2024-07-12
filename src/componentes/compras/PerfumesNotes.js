import React from 'react';
import {Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography} from '@mui/material';

import naranja from '../../imgs/icons8-naranja.png';
import flor from '../../imgs/icons8-flores.png';
import madera from '../../imgs/icons8-arbol.png';


export default function PerfumeNotes({ open, muestra, titulo, onClose }) {

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby={"informativo"}>
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
                    <Typography variant="subtitle1" gutterBottom><strong>Propósito:</strong> Estabilizan las notas de salida y preparan el camino para las notas de fondo.</Typography>      
                  </Paper>
                </div>
                : muestra === 3 ?
                  <div>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                      <Typography variant="subtitle1" gutterBottom><strong>Descripción:</strong> Las notas de fondo son las notas que se perciben al final y son las que más perduran en la piel.</Typography>
                      <Typography variant="subtitle1" gutterBottom><strong>Duración:</strong> Pueden durar algunas horas, incluso hasta un día entero.</Typography>
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
            onClick={onClose}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
