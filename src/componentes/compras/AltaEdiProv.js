import React from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { MuiTelInput } from "mui-tel-input";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import SearchIcon from "@mui/icons-material/Search";

import PropTypes from "prop-types";
import axios from "axios";

export default function AltaEdiProv(props) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [telef_casa, setTelCasa] = React.useState("");
  const [paises, setPaises] = React.useState([]);
  const [bancos, setBancos] = React.useState([]);
  const [formValues, setFormValues] = React.useState({
    empresa: "",
    rfc: "",
    fiscal: "",
    curp: "",
    calle: "",
    num_ext: "",
    num_int: "",
    cp: "",
    colonia: "",
    municipio: "",
    estado: "",
    pais: "",
    clasificacion: "",
    tipo: "",
    contacto: "",
    telefono: "",
    email: "",
  });

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

  async function completeAddress(my_cp) {
    try {
      const response = await axios.post(`http://localhost:5784/cp-plus`, {
        mcp: my_cp,
      });
      const data = response.data;
      console.log("data", data);
      if (data) {
        const municipiosUnicos = [];
        const municipiosVistos = new Set();
        data.forEach((item) => {
          if (!municipiosVistos.has(item.tcodmunicipios.municipio)) {
            municipiosUnicos.push(item);
            municipiosVistos.add(item.tcodmunicipios.municipio);
          }
        });
      }
    } catch (error) {
      console.error("Error al buscar datos:", error);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5784/v1/compras/bancos`);
        const data = response.data;
        setBancos(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleFindyCP = () => {};

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
                <Tab label="Forma de pago" {...a11yProps(3)} />
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
                  value={formValues.empresa}
                  onChange={(e) => {
                    setFormValues({ ...formValues, empresa: e.target.value });
                  }}
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
                      value={formValues.rfc}
                      onChange={(e) => {
                        setFormValues({ ...formValues, rfc: e.target.value });
                      }}
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
                      value={formValues.fiscal}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          fiscal: e.target.value,
                        });
                      }}
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
                    value={formValues.curp}
                    onChange={(e) => {
                      setFormValues({ ...formValues, curp: e.target.value });
                    }}
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
                  value={formValues.calle}
                  onChange={(e) => {
                    setFormValues({ ...formValues, calle: e.target.value });
                  }}
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
                      value={formValues.num_ext}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          num_ext: e.target.value,
                        });
                      }}
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
                      value={formValues.num_int}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          num_int: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Código Postal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleFindyCP}
                            edge="end"
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      value={formValues.cp}
                      onChange={(e) => {
                        setFormValues({ ...formValues, cp: e.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    id="colonia"
                    label="Colonia"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    value={formValues.colonia}
                  >
                   
                    <MenuItem value="0">Otro</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    id="municipio"
                    label="Municipio"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                    value={formValues.municipio}
                  >
                    
                    <MenuItem value="0">Otro</MenuItem>
                  </TextField>
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
                      value={formValues.estado}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="pais"
                      label="País"
                      select
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      value={formValues.pais}
                    >
                    {paises.map((pais) => (
                      <MenuItem key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </MenuItem>))};
                    </TextField>  
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
                      value={formValues.clasificacion}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          clasificacion: e.target.value,
                        });
                      }}
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
                      value={formValues.tipo}
                      onChange={(e) => {
                        setFormValues({ ...formValues, tipo: e.target.value });
                      }}
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
                    value={formValues.contacto}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        contacto: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <MuiTelInput
                      label="Teléfono de casa"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={telef_casa}
                      defaultCountry="MX"
                      onChange={(e) => {
                        setTelCasa(e);
                        setFormValues({
                          ...formValues,
                          telefono: telef_casa,
                        });
                      }}
                      inputProps={{ maxLength: 20 }}
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
                      value={formValues.email}
                      onChange={(e) => {
                        setFormValues({ ...formValues, email: e.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    id="dias_credito"
                    label="Días de crédito"
                    type="number"
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                  />              
                </Grid>
                <Grid item xs={6} md={6}>
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
              </Grid>
              <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="descuento"
                      label="Descuento"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
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
                      <MenuItem value="EURO">EURO</MenuItem>
                    </TextField>
                  </Grid>
              </Grid>
              <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="metodo_pago"
                      select
                      label="Termino de pago"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    >                  
                    </TextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="cobtrofac"
                      label="Cobro por factura"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
            </Grid>
            <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="lead_time"
                      select
                      label="Lead time(días)"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    >                  
                    </TextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="tiempo_caducar"
                      label="Tiempo caducar costo"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
            </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
            <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="forma"
                      select
                      label="Forma de pago"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    >                  
                    </TextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="titular"
                      label="Titular de la cuenta"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
            </Grid>
            <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="banco"
                      select
                      label="Banco"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    >     
                   
                    </TextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="sucursal"
                      label="Sucursal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
            </Grid>
            <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="cuenta"
                      label="Cuenta"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    >                  
                    </TextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="clabe"
                      label="CLABE"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
            </Grid>
            <Divider>
              <Chip label="Procesos fiscales" size="small" />
            </Divider>
            <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="tercero"
                      label="Tipo de tercero"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="tipo_operacion"
                      label="Tipo de operación"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
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
