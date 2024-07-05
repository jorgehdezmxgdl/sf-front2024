import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import axios from 'axios';
import "dayjs/locale/es-mx";
import {
  Button,
  Tooltip,
  Grid,
  Avatar
} from "@mui/material";
import Box from "@mui/material/Box";
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MiModulo from "./Modulo";
import Empleado from "./Empleado";
import { LocaleText } from '../utilities/LocaleText';
import ConfirmacionDlg from "../utilities/ConfirmacionDlg";

function MyComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState("none");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [mdata, setMdata] = useState({});
  const [confirma, setConfirma] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5784/empleados');
        const processedData = response.data.map((empleado) => ({
          ...empleado,
          avatarUrl: empleado.imagen, // Asegúrate de que `avatar` contiene la cadena Base64 completa
        }));
        console.log('Datos obtenidos:', processedData);
        setRows(processedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, [fetchTrigger]);

  const handleClickOpen = async (params) => {
    setIsReadOnly(false);
    setOpen(true);
  };

  const handleRowClickOpen = async (params) => {
    try {
      const employeeId = params.row.id;
      const response = await axios.get('http://127.0.0.1:5784/empleados/busca', { params: { id: employeeId } });
      if (response) {
        setIsReadOnly(true);
        setMdata(response.data);
        setOpen(true);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "imagen",
      headerName: "Foto",
      sortable: false,
      width: 100,
      editable: false,
      renderCell: (params) => {
        <Avatar src={params.value} alt={"imagen"} />
      }
    },
    {
      field: "nombre",
      headerName: "Nombre(s)",
      width: 200,
      editable: false,
    },
    {
      field: "apellido_paterno",
      headerName: "Apellido Paterno",
      width: 200,
      editable: false,
    },
    {
      field: "apellido_materno",
      headerName: "Apellido Materno",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
      //type: "number",
      width: 200,
      editable: false,
    },
    {
      field: "telef_casa",
      headerName: "Teléfono casa",
      //type: "date",
      width: 190,
      editable: false,
    },
    {
      field: "telef_mobile",
      headerName: "Teléfono móvil",
      //type: "date",
      width: 190,
      editable: false,
    },
    {
      field: "numero_ss",
      headerName: "Número de SS",
      //type: "date",
      width: 190,
      editable: false,
    },
    {
      field: "activo",
      headerName: "Estatus",
      //type: "date",
      width: 90,
      editable: false,
      renderCell: (params) => {
        return params.value === 1 ? "Activo" : "Inactivo";
      }
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      cellClassName: "actions-cell",
      width: 250,
      renderCell: (params) => {
        const onClickEdit = (e) => {
          e.stopPropagation(); 
          const value = params.row.id;
        };

        const onClickDelete = async (e) => {
          e.stopPropagation(); 
          const myId = { id: params.id };

          //try {
            /*
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
            */

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

  function CustomToolbar() {
    return (
      <Tooltip title="Escribe el dato que te interesa buscar" placement="right-start">
          <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
            <GridToolbarQuickFilter />
          </GridToolbarContainer>
      </Tooltip>
    );
  }

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
        <Box sx={{ height: '79vh', width: '97vw' }}>
          <Box display="flex" justifyContent="center" mb={5}>
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
            components={{
              Toolbar: CustomToolbar,
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                fontWeight: 'bolder',
              },
              '& .actions-cell:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bolder',
                fontSize: '12px'
              },
            }}
            localeText={LocaleText}
            pageSizeOptions={[15,30,45,60,75,90]}
            classes={{ columnHeaders: 'font-weight: bold;' }}
            onRowClick={handleRowClickOpen}
          />
        </Box>
      )}
      {show === "image" && <MiModulo />}
      <Empleado isReadOnly={isReadOnly} mdata={mdata} open={open} handleClose={handleClose} />
    </div>
  );
}

export default MyComponent;
