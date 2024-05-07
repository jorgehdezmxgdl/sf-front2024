import React, { useState } from "react";
import {
    Button,
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    MenuItem,
  } from "@mui/material";

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Base from "./Base";
import Puesto from "./Puesto";

export default function MenuConfig() {
  const [component, ShowComponent] = useState(0);

  return (
    <div>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2}>
          <Button
            startIcon={<MeetingRoomIcon />}
            variant="contained"
            color="primary"
            onClick={() => ShowComponent(1)}
          >
            Departamentos
          </Button>
        </Grid>
        <Grid item xs={2} sm={2}>
          <Button
            startIcon={<AssignmentIndIcon />}
            variant="contained"
            color="secondary"
            onClick={() => ShowComponent(2)}
          >
            Puestos
          </Button>
        </Grid>
      </Grid>
       {  component === 1 && <Base moduleName="Departamento"/>  }
       {  component === 2 && <Puesto moduleName="Puesto"/>  }        
    </div>
  );
}
