import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AltaCatalogo from "./AltaCatalogo";
import { esES } from "@mui/x-data-grid/locales";

import axios from "axios";

export default function Catalogo() {
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "sku",
      headerName: "SKU",
      width: 190,
      editable: false,
    },
    {
      field: "nombre",
      headerName: "Nombre del Producto",
      width: 150,
      editable: false,
    },
    {
      field: "barcode",
      headerName: "Código de Barras",
      width: 150,
      editable: false,
    },
    {
      field: "disenador",
      headerName: "Diseñador",
      width: 200,
      editable: false,
    },
    {
      field: "genero",
      headerName: "Género",
      width: 200,
      editable: false,
    },
    {
      field: "presentacion",
      headerName: "Presentación",
      width: 150,
      editable: false,
    },
    {
      field: "ml",
      headerName: "ML",
      width: 150,
      editable: false,
    },
    {
      field: "pais",
      headerName: "País",
      width: 150,
      editable: false,
    },
    {
      field: "almacen",
      headerName: "Almacen",
      width: 150,
      editable: false,
    },
    {
      field: "ubicacion",
      headerName: "Ubicación",
      width: 150,
      editable: false,
    },
    {
      field: "minimo",
      headerName: "Mínimo",
      width: 150,
      editable: false,
    },
    {
      field: "maximo",
      headerName: "Máximo",
      width: 150,
      editable: false,
    },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      headerAlign: "center",
      cellClassName: "actions-cell",
      width: 290,
      renderCell: (params) => {},
    },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5784/v1/compras/catalogo");
        const data = response.data;
        setRows(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = () => {
    setShow(true);
  };

  const handleCloseDialog = () => {
    setShow(false);
  };



  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          padding: 0,
          margin: 0,
        }}
      >
        <Grid container sx={{ width: "100%", padding: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
              onClick={handleOpenDialog}
            >
              Adicionar producto
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ height: "calc(100% - 300px)", mt: 2, width: "95%" }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15, 30, 45, 60,75, 90]}
            checkboxSelection
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
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </Box>
      {show ? <AltaCatalogo handleCloseDialog={handleCloseDialog} /> : null}
    </div>
  );
}
