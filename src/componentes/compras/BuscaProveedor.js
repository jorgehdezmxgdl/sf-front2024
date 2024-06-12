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
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";

export default function BuscaProveedor({open2}){
    const [open, setOpen] = React.useState(open2);
    const [listado, setListado] = React.useState([]);
  
    const handleCloseDialog = () => {
      setOpen(false);
    };

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5784/productos");
          setListado(response.data || []);
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
          field: "name",
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
        <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Hola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item md={4}>
              <Box display="flex" flexDirection="row" gap="10px">
                  <DataGrid  rows={listado}  columns={columns} />  
              </Box>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    );
}