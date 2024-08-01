import React from "react";
import { TextField, MenuItem, Avatar, Box, Typography,Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
  } from 'recharts';

function InventarioAlmacen() {
    const [rows, setRows] = React.useState([]);

    const lineData = [
        { name: 'Enero', ventas2023: 400, ventas2024: 240 },
        { name: 'Febrero', ventas2023: 300, ventas2024: 139 },
        { name: 'Marzo', ventas2023: 200, ventas2024: 980 },
        { name: 'Abril', ventas2023: 278, ventas2024: 390 },
        { name: 'Mayo', ventas2023: 189, ventas2024: 480 },
        { name: 'Junio', ventas2023: 239, ventas2024: 380 },
        { name: 'Julio', ventas2023: 349, ventas2024: 430 },
      ];
    
     
      const barData = [
        { name: 'Citrico', votos: Math.floor(Math.random() * 100) },
        { name: 'Amaderado', votos: Math.floor(Math.random() * 100) },
        { name: 'Citronella', votos: Math.floor(Math.random() * 100) },
        { name: 'Fresco', votos: Math.floor(Math.random() * 100) },
        { name: 'Naranja', votos: Math.floor(Math.random() * 100) },
        { name: 'Rosas', votos: Math.floor(Math.random() * 100) },
      ];

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        {
          field: "sku",
          headerName: "SKU",
          width: 140,
          editable: false,
        },
        {
          field: "foto",
          headerName: "Imagen",
          width: 100,
          editable: false,
          renderCell: (params) => {
            return (
              <Avatar src={params.value} 
                 sx={{ width: 50, height: 50 }} />
            );
          },
        },
        {
          field: "estatus",
          headerName: "Estatus",
          width: 150,
          editable: false,
        },
        {
          field: "nombre",
          headerName: "Nombre del Producto",
          width: 230,
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
          field: "activo",
          headerName: "Activo",
          width: 150,
          editable: false,
          renderCell: (params) => {
            return params.value ? "Si" : "No";
          },
        },
    ];

    return ( 
        <div>
          <Typography variant="p" color="initial">
             Inventario por Almacen
          </Typography>  
          <TextField
              label="Almacen"
              select
              fullWidth
              margin="normal"
            >
                <MenuItem value={10}>Central</MenuItem>
                <MenuItem value={20}>Plaza Bonita</MenuItem>
                <MenuItem value={20}>Ecommerce</MenuItem>
            </TextField>
            <br />
             
       
            <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 300, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>Ventas Mensuales</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas2023" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="ventas2024" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ height: 300, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>Notas mas vendidas</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
      <br />
            <Box sx={{ height: "calc(100% - 10%)", mt: 2, width: "100%" }}>
                <DataGrid
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    checkboxSelection={false}
                    rowsPerPageOptions={[15, 30, 45, 60,75, 90]}
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
        </div>
     );
}

export default InventarioAlmacen;