import * as React from 'react';
import { Box, Grid, Paper, Typography, Avatar } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { esES } from "@mui/x-data-grid/locales";
import Filtros from './Filtros';


function Utilidad() {
    //  const [rows, setRows] = React.useState([]);

    const columns1 = [
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
            sortable: false,
            renderCell: (params) => {
                return (
                    <Avatar src={params.value}
                        sx={{ width: 50, height: 50 }} />
                );
            },
        },
        {
            field: "precio_costo",
            headerName: "Precio Costo",
            width: 140,
            editable: false
        },
        {
            field: "precio_venta",
            headerName: "Precio Venta",
            width: 140,
            editable: false
        },
        {
            field: "utilidad",
            headerName: "% Utilidad",
            width: 140,
            editable: false
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
    ];



    const columns = [
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'nombreProducto', headerName: 'Nombre del Producto', width: 200 },
        { field: 'precioCosto', headerName: 'Precio Costo', width: 150 },
        { field: 'precioVenta', headerName: 'Precio Venta', width: 150 },
        { field: 'margenUtilidad', headerName: 'Margen de Utilidad (%)', width: 200 },
    ];

    const calculateProfitMargin = (costPrice, salePrice) => {
        return ((salePrice - costPrice) / costPrice) * 100;
    };

    const rows = [
        { id: 1, sku: 'P001', nombreProducto: 'Perfume A', precioCosto: 50, precioVenta: 80, margenUtilidad: calculateProfitMargin(50, 80).toFixed(2) },
        { id: 2, sku: 'C001', nombreProducto: 'Colonia B', precioCosto: 30, precioVenta: 45, margenUtilidad: calculateProfitMargin(30, 45).toFixed(2) },
        { id: 3, sku: 'L001', nombreProducto: 'Loción C', precioCosto: 20, precioVenta: 40, margenUtilidad: calculateProfitMargin(20, 40).toFixed(2) },
        { id: 4, sku: 'A001', nombreProducto: 'Aerosol D', precioCosto: 10, precioVenta: 50, margenUtilidad: calculateProfitMargin(10, 50).toFixed(2) },
        { id: 5, sku: 'P002', nombreProducto: 'Perfume E', precioCosto: 60, precioVenta: 80, margenUtilidad: calculateProfitMargin(60, 80).toFixed(2) },
        { id: 6, sku: 'C002', nombreProducto: 'Colonia F', precioCosto: 40, precioVenta: 50, margenUtilidad: calculateProfitMargin(40, 50).toFixed(2) },
        { id: 7, sku: 'L002', nombreProducto: 'Loción G', precioCosto: 25, precioVenta: 90, margenUtilidad: calculateProfitMargin(25, 90).toFixed(2) },
        { id: 8, sku: 'A002', nombreProducto: 'Aerosol H', precioCosto: 15, precioVenta: 89, margenUtilidad: calculateProfitMargin(15, 89).toFixed(2) },
        { id: 9, sku: 'P003', nombreProducto: 'Perfume I', precioCosto: 70, precioVenta: 100, margenUtilidad: calculateProfitMargin(70, 100).toFixed(2) },
        { id: 10, sku: 'C003', nombreProducto: 'Colonia J', precioCosto: 35, precioVenta: 47, margenUtilidad: calculateProfitMargin(35, 47).toFixed(2) }
    ];

    const categorizeSales = (rows) => {
        const categories = {
            Perfumes: 0,
            Colonias: 0,
            Lociones: 0,
            Aerosoles: 0
        };

        rows.forEach(row => {
            if (row.nombreProducto.toLowerCase().includes('perfume')) {
                categories.Perfumes += 1;
            } else if (row.nombreProducto.toLowerCase().includes('colonia')) {
                categories.Colonias += 1;
            } else if (row.nombreProducto.toLowerCase().includes('loción') || row.nombreProducto.toLowerCase().includes('locion')) {
                categories.Lociones += 1;
            } else if (row.nombreProducto.toLowerCase().includes('aerosol')) {
                categories.Aerosoles += 1;
            }
        });

        return [
            { name: 'EDC', value: categories.Perfumes, color: '#8884d8' },
            { name: 'Parfum', value: categories.Colonias, color: '#82ca9d' },
            { name: 'Edt', value: categories.Lociones, color: '#ffc658' },
            { name: 'Edp', value: categories.Aerosoles, color: '#ff7300' }
        ];
    };

    const data = categorizeSales(rows);


    const calculateProfitTrends = (rows) => {
        return rows.map((row, index) => ({
            name: `Producto ${index + 1}`,
            margenUtilidad: row.margenUtilidad
        }));
    };

    const profitTrends = calculateProfitTrends(rows);

    return (
        /*    <Box 
              sx={{
                 height: '80vh',
                 width: '97%',
                 mt: 2,
              }}        
            >
                <Paper variant="elevation" elevation="">
                    hola
                </Paper>
                <DataGrid
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    checkboxSelection={false}
                    rowsPerPageOptions={[15, 30, 45, 60, 75, 90]}
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
            */
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Filtros />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Márgenes de Utilidad por Categoría
                        </Typography>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Tendencia de Márgenes de Utilidad
                        </Typography>
                        <LineChart
                            width={500}
                            height={300}
                            data={profitTrends}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 650]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="margenUtilidad" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Línea más vendida
                        </Typography>
                        <PieChart width={400} height={300}>
                            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Paper>
                </Grid>


                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Tabla de Productos con Márgenes de Utilidad
                        </Typography>
                        <DataGrid
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            rows={[]}
                            columns={columns1}
                            pageSize={15}
                            checkboxSelection={false}
                            rowsPerPageOptions={[15, 30, 45, 60, 75, 90]}
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
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Utilidad;