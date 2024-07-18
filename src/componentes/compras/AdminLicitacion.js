import React from 'react';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import dayjs from 'dayjs';

export default function AdminLicitacion(props) {
    return (
       <Dialog open={props.show} onClose={props.handleCloseDialog} aria-labelledby={"idlicitacion"}>
         <DialogTitle id={"idlicita"}>
             Crear una nueva licitación
         </DialogTitle>
         <DialogContent>
           <DialogContentText>
               <Accordion expanded={true}>
                 <AccordionSummary
                   expandIcon={<ExpandMore />}
                   aria-label="Expand"
                   aria-controls="-content"
                   id="-header"
                 >
                   <Typography>
                        Datos de la licitación
                   </Typography>
                 </AccordionSummary>
                 <AccordionDetails>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Selecciona el dia inicial">
                            <DesktopDatePicker defaultValue={dayjs()} />
                        </DemoItem>
                        <DemoItem label="Selecciona la hora inicial">
                            <TimePicker label="Hora inicial" />
                        </DemoItem>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Selecciona el dia final">
                            <DesktopDatePicker defaultValue={dayjs()} />
                        </DemoItem>
                        <DemoItem label="Selecciona la hora final">
                            <TimePicker label="Hora final" />
                        </DemoItem>
                    </LocalizationProvider>
                 </AccordionDetails>
               </Accordion>
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button
             onClick={props.handleCloseDialog}
             color="secondary"
           >
             Cerrar
           </Button>
           <Button
             onClick={props.handleCloseDialog}
             color="primary"
             variant='contained'
           >
             Registrar
           </Button>
         </DialogActions>
       </Dialog>
    );
}