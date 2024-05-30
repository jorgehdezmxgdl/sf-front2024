import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { esES } from "@mui/x-data-grid/locales";
import DialogoEspera from "./DialogoEspera";
import dayjs from 'dayjs';

import axios from "axios";

export default function Compra() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "Proveedor", headerName: "Proveedor", width: 100 },
    {
      field: "empresa",
      headerName: "Empresa",
      width: 140,
      editable: false,
    },
    {
      field: "folio",
      headerName: "Folio",
      width: 110,
      editable: false,
    },
    {
        field: "total_venta",
        headerName: "Total ventas",
        width: 140,
        editable: false,
    },
    {
      field: "total_compra",
      headerName: "Total de la compra",
      width: 140,
      editable: false,
    },
    {
      field: "ganancia",
      headerName: "Ganancia",
      width: 100,
      editable: false,
    },
    {
        field: "porcentaje_utilidad",
        headerName: "Porcentaje de utilidad",
        width: 160,
        editable: false,
    },
    {
        field: "fecha_pedido",
        headerName: "Fecha de pedido",
        width: 140,
        editable: false,
        renderCell: (params) => {
            return dayjs(params.value).format('DD-MM-YYYY');
        }
    },
    {
        field: "fecha_estimadaentrega",
        headerName: "Fecha estimada de entrega",
        width: 190,
        editable: false,
        renderCell: (params) => {
            return dayjs(params.value).format('DD-MM-YYYY');
        }
    },
    {
        field: "fecha_entrega",
        headerName: "Fecha de entrega",
        width: 140,
        editable: false,
        renderCell: (params) => {
            return dayjs(params.value).format('DD-MM-YYYY');
        }
    },
    {
        field: "cumplimiento",
        headerName: "Cumplimiento",
        width: 100,
        editable: false,
    },
    {
        field: "completo",
        headerName: "Completo",
        width: 100,
        editable: false,
    },
  ];

  const handleOpenDialog = async () => {
    try {
        setLoading(true);
        const response = await axios.get("http://localhost:5784/v1/recomendacion");
        setRows(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
  }


  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              endIcon={<ReviewsIcon />}
              onClick={handleOpenDialog}
            >
              Generar nuevo estadistico
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ height: 850, mt: 2 }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50, 100, 150, 200]}
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
      <DialogoEspera open={loading} />
    </div>
  );
}
