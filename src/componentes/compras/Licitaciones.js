import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { Box, Button, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import axios from "axios";
import AdminLicitacion from "./AdminLicitacion";


export default function Licitaciones(props) {
    const [rows, setRows] = React.useState([]);
    const [show, setShow] = React.useState(false);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "fechaini", headerName: "Fecha inicial", width: 250 },
        { field: "fechafin", headerName: "Fecha final", width: 250 },
        {
            field: "lunes", headerName: "Lunes", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        {
            field: "martes", headerName: "Martes", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        {
            field: "miercoles", headerName: "Miercoles", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        {
            field: "jueves", headerName: "Jueves", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        {
            field: "viernes", headerName: "Viernes", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        {
            field: "sabado", headerName: "Sábado", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        {
            field: "domingo", headerName: "Domingo", width: 80,
            renderCell: (params) => {
                return params.value ? "X" : "";
            },
        },
        { field: "duracion", headerName: "Duración", width: 100 },

        {
            field: "terminado", headerName: "Terminado", width: 200,
            renderCell: (params) => {
                return params.value ? "Si" : "No";
            },
        },
        { field: "actions", headerName: "Acciones", width: 300 },
    ];

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5784/v1/compras/licitaciones");
                const data = response.data;
                setRows(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleOpenDialog = () => {
        setShow(true);
        console.log("handleOpenDialog", show);
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
                <Grid container sx={{ width: "100%", padding: 2, alignContent: 'center' }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            endIcon={<AddCircleOutlineIcon />}
                            onClick={handleOpenDialog}
                        >
                            Crear licitación
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ height: "calc(100% - 300px)", mt: 2, width: "95%" }}>
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
            </Box>
            {show && <AdminLicitacion  show={show} handleCloseDialog={handleCloseDialog} />}
        </div>
    );
}