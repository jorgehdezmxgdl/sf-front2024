import React, { useState, useEffect } from "react";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import axios from 'axios';
import { MuiTelInput } from "mui-tel-input";
import "dayjs/locale/es-mx";
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
import Box from "@mui/material/Box";
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MiModulo from "./Modulo";
import Empleado from "./Empleado";

function MyComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [formData, setFormData] = useState({
    codigo_empleado: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    genero: "",
    curp: "",
    rfc: "",
    imagen: "",
    email: "",
    telef_casa: "",
    telef_mobile: "",
    emergencia: "",
    telef_emergencia: "",
    estado_civil: "",
    tipo_sangre: "",
    activo: true,
    edicion: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {    
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    handleClose();
  };

  const {
    codigo_empleado,
    nombre,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    genero,
    curp,
    rfc,
    imagen,
    email,
    telef_casa,
    telef_mobile,
    emergencia,
    telef_emergencia,
    estado_civil,
    tipo_sangre,
    activo,
    edición,
  } = formData;

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "codigo_empleado",
      headerName: "Código empleado",
      width: 150,
      editable: true,
    },
    {
      field: "nombre",
      headerName: "Nombre(s)",
      width: 200,
      editable: true,
    },
    {
      field: "apellido_paterno",
      headerName: "Apellido Paterno",
      width: 200,
      editable: true,
    },
    {
      field: "apellido_materno",
      headerName: "Apellido Materno",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
      //type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "telef_mobile",
      headerName: "Teléfono móvil",
      //type: "date",
      width: 190,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      headerAlign: 'center' ,
      cellClassName: "actions-cell",
      width: 450,
      renderCell: (params) => {
        const onClickEdit = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const value = params.row.id;

          console.log("Edit", value);
        };

        const onClickDelete = async (e) => {
          e.stopPropagation(); // don't select this row after clicking

          // call your method to handle the delete action
          console.log("Delete", params.id);
          const myId = { id: params.id };

            try {
              const response = await axios.delete('http://127.0.0.1:5784/empleados', { data: myId });
              console.log('Código de estado:', response.status); // Muestra el código de estado de la respuesta
        
              if (response.status === 200) {
                // Ejecuta acciones específicas para el código de estado 200
                console.log('Datos enviados correctamente:', response.data);
                setFetchTrigger(prev => prev + 1);

              } else {
                // Manejo para otros códigos de estado
                console.log('Respuesta recibida con el código de estado:', response.status);
              }
              
            } catch (error) {
              console.error('Error al obtener los datos:', error);
              // Puedes manejar errores o mostrar mensajes de error aquí
            }
          
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
            <Button
              variant="contained"
              endIcon={<PermContactCalendarIcon />} 
              color="secondary"
              size="small"
              sx={{ "&:focus": { outline: "none" } }}
              style={{ marginLeft: 16 }}
              onClick={onClickDelete}
            >
              Permisos
            </Button>
            <Button
              variant="contained"
              endIcon={<DeleteIcon />}
              color="secondary"
              size="small"
              sx={{ "&:focus": { outline: "none" } }}
              style={{ marginLeft: 16 }}
              onClick={onClickDelete}
            >
              Eliminar
            </Button>

          </>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);  
  const [show, setShow] = useState("none"); // 'none', 'table' or 'image'
  const [phoneHome, setPhoneHome] = useState("");
  const [phoneMobile, setPhoneMobile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5784/empleados');
        setRows(response.data); // Asegúrate de que response.data contiene el array de filas esperado
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        // Puedes manejar errores o mostrar mensajes de error aquí
      }
    };

    fetchData();
  }, [fetchTrigger]); 
  const actualizarCampo = (campo, valor) => {
    setFormData(prevState => ({
      ...prevState,
      [campo]: valor
    }));
  };
  
  return (
    <div>
       <Grid container spacing={2}>
       <Grid item xs={2} sm={2}>
      <Button
        startIcon={<GroupIcon />}
        variant="contained"
        color="primary"
        onClick={() => setShow("table")}
      >
        Registro de empleados
      </Button>
      </Grid>
      <Grid item xs={2} sm={2}>
      <Button
       startIcon={<ListAltIcon />}
        variant="contained"
        color="secondary"
        onClick={() => setShow("image")}
      >
        Módulos del sistema
      </Button>
      </Grid>
      </Grid>
      {show === "table" && (
        <Box sx={{ height: 500, width: "100%" }}>
          <Box display="flex" justifyContent="flex-end" mb={5}>
            <Button variant="contained" onClick={handleClickOpen} endIcon={<AddCircleOutlineIcon />}>
              Adicionar empleado
            </Button>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
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
            pageSizeOptions={[5]}
            //onRowClick={handleClickOpen}
            
          />
        </Box>
      )}      
      {show === "image" && <MiModulo />}
      <Empleado open={open} handleClose={handleClose} />
    </div>
  );
}

export default MyComponent;
