import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddTaskIcon from "@mui/icons-material/AddTask";

import axios from "axios";

export default function BuscaProveedor(props) {
  const [listado, setListado] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5784/productos");
      setListado(response.data || []);
      console.log("no se ve");
    } catch (error) {
      console.error("Error al buscar datos:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "nombre",
      headerName: "Nombre del Producto",
      width: 600,
      editable: false,
    },
    {
      field: "presentacion",
      headerName: "Presentación",
      width: 130,
      editable: true,
      type: "number",
    },
  ];
  return (
    <Dialog
      open={props.open2}
      fullWidth
      maxWidth="lg"
      //sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "none" } }}
      onClose={props.handleClickOpen2}
    >
      <DialogTitle sx={{ bgcolor: "#865645", color: "white" }}>
        Catálogo de productos
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid item md={4}>
            <Box display="flex" flexDirection="row" gap="10px">
              <DataGrid
                style={{ height: "50%", width: "100%" }}
                rows={listado}
                maxWidth="lg"
                columns={columns}
                autoHeight
                disableSelectionOnClick
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6,
                    },
                  },
                }}
                pageSizeOptions={[6]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
              />
            </Box>
          </Grid>
          <br />
          <Box
            component="form"
            sx={{ mt: 2, display: "flex", flexDirection: "row" }}
          >
            <TextField
              label="Artículo"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              label="Cantidad"
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
              fullWidth
              endIcon={<AddTaskIcon />}
            >
              Agregar Requisición
            </Button>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#CFD8DC" }}>
        <Button onClick={props.handleCloseOpen2} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
