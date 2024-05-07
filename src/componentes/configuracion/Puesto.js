import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Alert,
  Box,
  Snackbar,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid";

import axios from "axios";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EditIcon from "@mui/icons-material/Edit";

import { traduceOption, traduceDate } from "../utilities/Utility";

export default function Puesto(props) {
  const [rows, setRows] = useState([]);
  const [numId, setNumId] = useState(0);
  const [option, setOption] = useState(1);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [tipo, setTipo] = useState("");
  const [shopen, setShopen] = useState(false);
  const [activo, setActivo] = useState(false);
  const [nombre, setNombre] = useState("");
  const inputRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (shopen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shopen]);

  const handleClickSnack = () => {
    setOpen(true);
  };

  const handleClickShopenClose = () => {
    setShopen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre === "" || nombre === null)  {
      setError(true);
      return;
    }
    if (option === 1) {
      const data = { nombre: nombre, activo: activo };
      await axios
        .post("http://127.0.0.1:5784/puestos", data)
        .then((response) => {
          if (response.status === 200) {
            handleClickShopenClose();
            setMessage("Dato adicionado correctamente...");
            setTipo("success");
            setOpen(true);
            fetchData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (option === 2) {
      const data = { nombre: nombre, activo: activo, id: numId };
      console.log(data);
      await axios
        .put("http://127.0.0.1:5784/puestos/",data)
        .then((response) => {
          if (response.status === 200) {
            handleClickShopenClose();
            setMessage("Dato actualizado correctamente...");
            setTipo("success");
            setOpen(true);
            fetchData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "nombre",
      headerName: "Nombre del puesto",
      width: 250,
    },
    {
      field: "activo",
      headerName: "Estatus del puesto",
      width: 250,
      renderCell: (params) => <span>{traduceOption(params.value)}</span>,
    },
    {
      field: "updatedAt",
      headerName: "Última actualización",
      width: 250,
      renderCell: (params) => <span>{traduceDate(params.value)}</span>,
    },
    {
      headerName: "Acciones",
      sortable: false,
      headerAlign: "center",
      cellClassName: "actions-cell",
      width: 150,
      renderCell: (params) => {
        const onClickEdit = (e) => {
          e.stopPropagation();
          setNumId(params.row.id);
          setNombre(params.row.nombre);
          setActivo(params.row.activo);
          setOption(2);
          setShopen(true);
          setError(false);
        };
        return (
          <>
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              color="primary"
              size="small"
              sx={{ "&:focus": { outline: "none" } }}
              style={{ marginLeft: 16 }}
              onClick={onClickEdit}
            >
              Editar
            </Button>
          </>
        );
      },
    },
  ];

 const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5784/puestos");
      if (response.status === 200) {
        if (response.data) {
          if (response.data.length > 0) {
            setRows(response.data);
          } else {
            setMessage("No hay datos para mostrar");
            setTipo("warning");
            setOpen(true);
          }
        }
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {   
    fetchData();
  }, []);

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>
        Administración de {props.moduleName}
      </h2>
      <Box display="flex" justifyContent="center" mb={5}>
        <Button
          variant="contained"
          endIcon={<MeetingRoomIcon />}
          onClick={() => {
            setNombre("");
            setActivo(false);
            setOption(1);
            setShopen(true);
            setError(false);
          }}
        >
          Adicionar {props.moduleName}
        </Button>
      </Box>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
      <Dialog open={shopen} onClose={handleClickShopenClose}>
        <DialogTitle>
          {option === 1 ? "Adicionando " : "Editando "} {props.moduleName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item xs={12} md={6}>
              <div>
                <TextField
                  label={"Nombre del " + props.moduleName}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value.toUpperCase());
                    if (error && e.target.value.trim() !== '') {
                        setError(false); 
                    }                    
                  }}
                  inputRef={inputRef}
                  error={error}
                  helperText={error ? "Este campo es obligatorio" : ""}
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
                        checked={activo}
                        onChange={(event) => {
                          setActivo(event.target.checked);
                        }}
                      />
                    }
                    label={"Activar " + props.moduleName}
                  />
                </FormGroup>
              </div>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              setShopen(false);
            }}
          >
            Cerrar
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Registrar cambios
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={tipo}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
