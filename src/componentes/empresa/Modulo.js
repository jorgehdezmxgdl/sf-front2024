import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  Box,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText, Tooltip,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LocaleText } from '../utilities/LocaleText';

import axios from "axios";

export default function MiModulo(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = React.useState(false);  
  const [rows, setRows] = useState([]);  
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleChangeChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  const [formData, setFormData] = useState({
    nombre: "",
    activo: false,
  });

  const [errors, setErrors] = useState({
    nombre: false
  });

  const validate = () => {
    let nombreError = formData.nombre === "";
    setErrors({
      nombre: nombreError,
    });
    return !nombreError;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "nombre",
      headerName: "Nombre del módulo",
      width: 150,
      editable: false,
    },
    {
      field: "activo",
      headerName: "¿Está activo?",
      width: 200,
      editable: false,
      renderCell: (params) => <span>{getEstadoDescripcion(params.value)}</span>
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      headerAlign: "center",
      cellClassName: "actions-cell",
      width: 450,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                console.log("Editar módulo con ID:", params.row.id);
              }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                console.log("Eliminar módulo con ID:", params.row.id);
              }}
            >
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

  function getEstadoDescripcion(valor) {
    const estados = {
      1: 'Habilitado',
      0: 'Deshabilitado'
    };
    return estados[valor] || 'Estado desconocido';  // Retorna 'Estado desconocido' si el valor no es 0 o 1
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5784/modulos');
        if (response.status === 200) {
           setRows(response.data);
        } else {

        }     
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, [fetchTrigger]); 

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <IconButton color="secondary" aria-label="Actualizar">
              <AutorenewIcon color="primary" />
            </IconButton>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
              onClick={handleClickOpen}
            >
              Adicionar módulo
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ height: 400, mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5, 10, 15, 20]}
            checkboxSelection
            localeText={LocaleText}
            disableSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            sx={{
              "& .actions-cell:focus-within": {
                outline: "none",
              },
            }}
            pageSizeOptions={[15,30,45,60,75,90]}
          />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClickClose}
        maxWidth={"md"}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();            
            if (validate()) {
                const response = await axios.post("http://127.0.0.1:5784/modulos", {"nombre" : formData.nombre, "activo" : formData.activo});
                if (formData.nombre === "") {
                  alert("Error ");    
                }
                try {
                  console.log("RESPONSE: ");
                  console.log(response);
                  alert(response);
                  if (response.status === 200) {
                    setFetchTrigger(prev => prev + 1);
                  } else {
                    console.log('Respuesta recibida con el código de estado:', response.status);
                  }
                } catch (error) {
                  if (error.response) {
                    console.error('Error en la respuesta:', error.response.status);
                    console.log('El servidor', error.response);
                  } else if (error.request) {
                    console.error('No se recibió respuesta del servidor');
                  } else {
                    console.error('Error al configurar la solicitud:', error.message);
                  }
                }
                handleClickClose();
            }
          },
        }}
      >
        <DialogTitle>Alta de módulo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete la siguiente información para incorporar un módulo al
            sistema
          </DialogContentText>
          <Grid item xs={12} md={6}>
            <div>
              <TextField
                label="Nombre del módulo"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value.toUpperCase() })
                }
                error={errors.nombre}
                helperText={errors.nombre ? 'Este campo es obligatorio' : ''}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      inputProps={{ "aria-label": "controlled" }}
                      checked={isChecked}
                      onChange={handleChangeChecked}
                      value={formData.activo}
                    />
                  }
                  label="Activar módulo"
                />
              </FormGroup>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cerrar</Button>
          <Button type="submit" color="primary" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
