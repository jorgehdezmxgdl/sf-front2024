import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AltaEdiProv from "./AltaEdiProv";

export default function Proveedor() {
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState(false);


  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "nombre",
      headerName: "Nombre del proveedor",
      width: 190,
      editable: false,
    },
    {
      field: "domicilio",
      headerName: "Domicilio",
      width: 150,
      editable: false,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
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

  const handleAdd_Proveedor = () => {
     setShow(true);
  };

  const handledCloseDialogAddEdit_Proveedor = () => {
    setShow(false);
  }

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
              onClick={handleAdd_Proveedor}
            >
              Adicionar proveedor
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
          />
        </Box>
      </Box>
      { show ?  <AltaEdiProv handledCloseDialogAddEdit_Proveedor={handledCloseDialogAddEdit_Proveedor} /> : null}
    </div>
  );
}
