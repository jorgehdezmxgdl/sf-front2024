import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Grid, MenuItem, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

import PropTypes from "prop-types";

export default function AltaEdiProv(props) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleClose = () => {
    setOpen(false);
    props.handledCloseDialogAddEdit_Proveedor();
    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Alta de un nuevo proveedor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Completa la información del proveedor
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Datos personales" {...a11yProps(0)} />
                <Tab label="Domicilio" {...a11yProps(1)} />
                <Tab label="Datos de compra" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="empresa"
                  label="Empresa"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="rfc"
                      label="RFC"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="fiscal"
                      label="Regimen Fiscal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="curp"
                    label="CURP"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="calle"
                  label="Calle"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="num_ext"
                      label="Número exterior"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="num_int"
                      label="Número interior"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      id="cp"
                      label="Código Postal"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="colonia"
                    label="Colonia"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="municipio"
                    label="Municipio"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="estado"
                      label="Estado"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="pais"
                      label="País"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="clasificacion"
                      label="Clasificación"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="tipo"
                      label="Tipo de proveedor"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="contacto"
                  label="Nombre del contacto"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="telefono"
                      label="Teléfono del contacto"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email del contacto"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="dias_credito"
                  label="Días de crédito"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="limite_credito"
                  label="Límite de crédito"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="moneda"
                  select
                  label="Moneda"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem value="MXN">MXN</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="metodo_pago"
                  select
                  label="Método de pago"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                  <MenuItem value="Transferencia">Transferencia</MenuItem>
                  <MenuItem value="Cheque">Cheque</MenuItem>
                  <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                </TextField>
              </Grid>
            </CustomTabPanel>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
