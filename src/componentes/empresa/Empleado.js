import { Button, Grid, MenuItem, TextField, Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { MuiTelInput } from "mui-tel-input";
import PropTypes from "prop-types";
import * as React from "react";

import axios from "axios";

import FotoEmpleado from "./FotoEmpleado";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { es } from "days";
import { esES } from "@mui/x-date-pickers/locales";

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

export default function Empleado({ open }) {
  const [value, setValue] = React.useState(0);
  const [telef_casa, setTelCasa] = React.useState("");
  const [telef_mobile, setTelMovil] = React.useState("");
  const [emergencia, setEmergencia] = React.useState("");
  const [inputValue, setInputValue] = React.useState("0");
  const [postalCodes, setPostalCodes] = React.useState([]);
  const [openx, setOpenx] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [estadosPais, setEstadosPais] = React.useState([]);
  const [departamento, setDepartamento] = React.useState([]);
  const [puesto, setPuesto] = React.useState([]);
  const [listadoMunicipios, setListadoMunicipios] = React.useState([]);
  const [colonias, setColonias] = React.useState([]);
  const [foto, setFoto] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFoto = (foto) => {
    setFoto(foto);
  };

  const [entradaTiempo, setEntradaTiempo] = React.useState(
    dayjs("2022-04-17T09:00")
  );
  const [salidaTiempo, setSalidaTiempo] = React.useState(
    dayjs("2022-04-17T18:00")
  );
  const [salidaComidaTiempo, setSalidaComidaTiempo] = React.useState(
    dayjs("2022-04-17T14:00")
  );
  const [entradaComidaTiempo, setEntradaComidaTiempo] = React.useState(
    dayjs("2022-04-17T15:00")
  );

  const [formValues, setFormValues] = React.useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: dayjs("1990-01-01"),
    genero: "",
    curp: "",
    numero_ss: "",
    rfc: "",
    imagen: "",
    email: "",
    telef_casa: "",
    telef_mobile: "",
    emergencia: "",
    telef_emergencia: "",
    estado_civil: "",
    tipo_sangre: "",
    domicilio: "",
    observaciones: "",
    codigo_postal: "",
    estadosPais: "14",
    municipio: "",
    colonia: "",
    pais: "MX",
    departamento: "",
    puesto: "",
    jefe: "",
    salario: "",
    fecha_ingreso: dayjs(),
    departamento: "1",
    puesto: "1",
  });

  const [formErrors, setFormErrors] = React.useState({});

  const spanishLocale =
    esES.components.MuiLocalizationProvider.defaultProps.localeText;

  function encontrarCamposVacios() {
    const campos = Object.keys(formValues);
    const camposVacios = campos.filter(
      (campo) => formValues[campo] === "" || formValues[campo] === null
    );
    return camposVacios;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = {};
    const camposVacios = encontrarCamposVacios();
    if (camposVacios.length > 0) {
      camposVacios.map((campo) => {
        errores[campo] = " es obligatorio este dato";
        return null;
      });
      setFormErrors(errores);
    } else {
      const campos = Object.keys(formValues);
      console.log(campos);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5784/estados-inegi");
        setEstadosPais(response.data || []);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }

      try {
        const response = await axios.get("http://localhost:5784/departamentos");
        setDepartamento(response.data || []);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }

      try {
        const response = await axios.get("http://localhost:5784/puestos");
        setPuesto(response.data || []);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:5784/cp`, {
          mcp: inputValue,
        });
        const data = response.data;
        setOptions(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    if (inputValue.length > 2) {
      fetchData();
    }
  }, [inputValue]);

  async function completeAddress(my_cp) {
    setListadoMunicipios([]);
    const response = await axios.post(`http://localhost:5784/cp-plus`, {
      mcp: my_cp,
    });

    const data = response.data;
    if (data) {
      const municipiosUnicos = [];
      const municipiosVistos = new Set();

      data.forEach((item) => {
        if (!municipiosVistos.has(item.tcodmunicipios.municipio)) {
          municipiosUnicos.push(item);
          municipiosVistos.add(item.tcodmunicipios.municipio);
        }
      });
      setColonias(data);
      setListadoMunicipios(municipiosUnicos);
      if (data.length > 0) {
        formValues.estadosPais = data[0].tcodestados.id;
        formValues.colonia = data[0].id;
        formValues.municipio = data[0].tcodmunicipios.id;
      }
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth={"md"}
      PaperProps={{
        component: "form",
        onSubmit: async (event) => {
          /*event.preventDefault();
          actualizarCampo("telef_casa", phoneHome);
          actualizarCampo("telef_mobile", phoneMobile);
          console.log(formData);
          try {
            const response = await axios.post(
              "http://127.0.0.1:5784/empleados",
              formData
            );
            console.log("Código de estado:", response.status); // Muestra el código de estado de la respuesta

            if (response.status === 200) {
              // Ejecuta acciones específicas para el código de estado 200
              console.log("Datos enviados correctamente:", response.data);
              setFetchTrigger((prev) => prev + 1);
            } else {
              // Manejo para otros códigos de estado
              console.log(
                "Respuesta recibida con el código de estado:",
                response.status
              );
            }
          } catch (error) {
            if (error.response) {
              // El servidor respondió con un código de estado fuera del rango 2xx
              console.error("Error en la respuesta:", error.response.status);
              console.log("El servidor", error.response);
            } else if (error.request) {
              // La solicitud se hizo pero no se recibió respuesta
              console.error("No se recibió respuesta del servidor");
            } else {
              // Algo más causó el error
              console.error("Error al configurar la solicitud:", error.message);
            }
          }*/
          //handleClose();
        },
      }}
    >
      <DialogTitle>Alta de empleado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete la siguiente información para incorporar una persona a
          nuestra compañia
        </DialogContentText>
        <form>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Datos personales" {...a11yProps(0)} />
                <Tab label="Domicilio" {...a11yProps(1)} />
                <Tab label="Área de trabajo" {...a11yProps(2)} />
                <Tab label="Sistemas" {...a11yProps(3)} />
                <Tab label="Horarios" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid item xs={12} md={6}>
                <div>
                  <Grid container spacing={2}>
                    <FotoEmpleado handleFoto={handleFoto} />
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Nombre(s)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formValues.nombre}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            nombre: e.target.value,
                          });
                          if (
                            formErrors.nombre &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({ ...formErrors, nombre: "" });
                          }
                        }}
                        error={!!formErrors.nombre}
                        helperText={formErrors.nombre || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Apellido Paterno"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formValues.apellido_paterno}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            apellido_paterno: e.target.value,
                          });
                          if (
                            formErrors.apellido_paterno &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              apellido_paterno: "",
                            });
                          }
                        }}
                        error={!!formErrors.apellido_paterno}
                        helperText={formErrors.apellido_paterno || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Apellido Materno"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formValues.apellido_materno}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            apellido_materno: e.target.value,
                          });
                          if (
                            formErrors.apellido_materno &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              apellido_materno: "",
                            });
                          }
                        }}
                        error={!!formErrors.apellido_materno}
                        helperText={formErrors.apellido_materno || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <div>
                        <DemoContainer components={["DatePicker"]}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={es}
                            localeText={spanishLocale}
                          >
                            <DatePicker
                              margin="normal"
                              fullWidth
                              label="Fecha de nacimiento"
                              value={formValues.fecha_nacimiento}
                              disableFuture
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  fecha_nacimiento: dayjs(e),
                                });
                                if (
                                  formErrors.fecha_nacimiento &&
                                  e.target.value.trim() !== ""
                                ) {
                                  setFormErrors({
                                    ...formErrors,
                                    fecha_nacimiento: "",
                                  });
                                }
                              }}
                              slotProps={{
                                textField: {
                                  helperText: "DD/MM/AAAA",
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </DemoContainer>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Edad"
                        margin="normal"
                        fullWidth
                        inputProps={{
                          maxLength: 25,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={dayjs().diff(
                          formValues.fecha_nacimiento,
                          "year"
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Género"
                        select
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={formValues.genero}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            genero: e.target.value,
                          });
                          if (
                            formErrors.genero &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              genero: "",
                            });
                          }
                        }}
                        error={!!formErrors.genero}
                        helperText={formErrors.genero || ""}
                      >
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Femenino</MenuItem>
                        <MenuItem value="X">No binario</MenuItem>
                        <MenuItem value="N">Prefiero no contestar</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Estado Civil"
                        select
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            estado_civil: e.target.value,
                          });
                          if (
                            formErrors.estado_civil &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              estado_civil: "",
                            });
                          }
                        }}
                        error={!!formErrors.estado_civil}
                        helperText={formErrors.estado_civil || ""}
                      >
                        <MenuItem value="S">Soltero/a</MenuItem>
                        <MenuItem value="C">Casado/a</MenuItem>
                        <MenuItem value="D">Divorciado/a</MenuItem>
                        <MenuItem value="V">Viudo/a</MenuItem>
                        <MenuItem value="U">Unión libre</MenuItem>
                        <MenuItem value="O">Otro</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Tipo de Sangre"
                        select
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            tipo_sangre: e.target.value,
                          });
                          if (
                            formErrors.tipo_sangre &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              tipo_sangre: "",
                            });
                          }
                        }}
                        error={!!formErrors.tipo_sangre}
                        helperText={formErrors.tipo_sangre || ""}
                      >
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        <MenuItem value="D">No lo sé</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Número de Seguro Social"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            numero_ss: e.target.value,
                          });
                          if (
                            formErrors.numero_ss &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              numero_ss: "",
                            });
                          }
                        }}
                        error={!!formErrors.numero_ss}
                        helperText={formErrors.numero_ss || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="CURP"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            curp: e.target.value,
                          });
                          if (formErrors.curp && e.target.value.trim() !== "") {
                            setFormErrors({
                              ...formErrors,
                              curp: "",
                            });
                          }
                        }}
                        error={!!formErrors.curp}
                        helperText={formErrors.curp || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="RFC"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            rfc: e.target.value,
                          });
                          if (formErrors.rfc && e.target.value.trim() !== "") {
                            setFormErrors({
                              ...formErrors,
                              rfc: "",
                            });
                          }
                        }}
                        error={!!formErrors.rfc}
                        helperText={formErrors.rfc || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Correo electrónico"
                        type="email"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            email: e.target.value,
                          });
                          if (
                            formErrors.email &&
                            e.target.value.trim() !== ""
                          ) {
                            setFormErrors({
                              ...formErrors,
                              email: "",
                            });
                          }
                        }}
                        error={!!formErrors.email}
                        helperText={formErrors.email || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MuiTelInput
                        label="Teléfono de casa"
                        fullWidth
                        variant="outlined"
                        defaultCountry="MX"
                        onChange={(e) => {
                          setTelCasa(e);
                          formValues.telef_casa = telef_casa;
                          if (
                            formErrors.telef_casa &&
                            telef_casa.trim() !== ""
                          ) {
                            setFormErrors({ ...formErrors, telef_casa: "" });
                          }
                        }}
                        value={formValues.telef_casa}
                        inputProps={{ maxLength: 16 }}
                        error={!!formErrors.telef_casa}
                        helperText={formErrors.telef_casa || ""}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MuiTelInput
                        label="Teléfono celular"
                        fullWidth
                        variant="outlined"
                        defaultCountry="MX"
                        onChange={(e) => {
                          setTelMovil(e);
                          formValues.telef_mobile = telef_mobile;
                          if (
                            formErrors.telef_mobile &&
                            telef_mobile.trim() !== ""
                          ) {
                            setFormErrors({ ...formErrors, telef_mobile: "" });
                          }
                        }}
                        value={formValues.telef_mobile}
                        inputProps={{ maxLength: 16 }}
                        error={!!formErrors.telef_mobile}
                        helperText={formErrors.telef_mobile || ""}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div>
                <TextField
                  label="Domicilio (Calle y número)"
                  fullWidth
                  placeholder="Calle Venustiano Carranza #1234 esquina Miguel de Legaspi"
                  value={formValues.domicilio}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      domicilio: e.target.value,
                    });
                    if (formErrors.domicilio && e.target.value.trim() !== "") {
                      setFormErrors({
                        ...formErrors,
                        domicilio: "",
                      });
                    }
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      getOptionLabel={(option) => option.cp.toString()}
                      options={options}
                      noOptionsText="Escriba un código postal"
                      inputValue={inputValue || formValues.codigo_postal}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        if (newInputValue.length === 5) {
                          completeAddress(newInputValue);
                          setFormValues({
                            ...formValues,
                            codigo_postal: newInputValue,
                          });
                        }
                      }}
                      onClick={() => {}}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Código Postal"
                          variant="outlined"
                          margin="normal"
                          maxLength="5"
                          onFocus={() => setInputValue("")}
                          InputProps={{
                            ...params.InputProps,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Colonia"
                      select
                      fullWidth
                      margin="normal"
                      value={formValues.colonia}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          colonia: e.target.value,
                        });
                        if (
                          formErrors.colonia &&
                          e.target.value.trim() !== ""
                        ) {
                          setFormErrors({
                            ...formErrors,
                            colonia: "",
                          });
                        }
                      }}
                      error={!!formErrors.colonia}
                      helperText={formErrors.colonia || ""}
                    >
                      {colonias.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.colonia}
                        </MenuItem>
                      ))}
                      <MenuItem value="O">Otro</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Municipio"
                      select
                      fullWidth
                      value={formValues.municipio}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          municipio: e.target.value,
                        });
                        if (
                          formErrors.municipio &&
                          e.target.value.trim() !== ""
                        ) {
                          setFormErrors({
                            ...formErrors,
                            municipio: "",
                          });
                        }
                      }}
                      error={!!formErrors.municipio}
                      helperText={formErrors.municipio || ""}
                    >
                      {listadoMunicipios.map((item, index) => (
                        <MenuItem key={index} value={item.tcodmunicipios.id}>
                          {item.tcodmunicipios.municipio}
                        </MenuItem>
                      ))}
                      <MenuItem value="O">Otro</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Estado"
                      select
                      fullWidth
                      value={formValues.estadosPais}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          estadosPais: e.target.value,
                        });
                        if (
                          formErrors.estadosPais &&
                          e.target.value.trim() !== ""
                        ) {
                          setFormErrors({
                            ...formErrors,
                            estadosPais: "",
                          });
                        }
                      }}
                      error={!!formErrors.estadosPais}
                      helperText={formErrors.estadosPais || ""}
                    >
                      {estadosPais.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.estado}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Pais"
                      margin="normal"
                      fullWidth
                      select
                      value={formValues.pais}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem value="MX" key="MX">
                        México
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </div>
              <Divider>
                <Chip
                  label="Datos de contacto en caso de emergencia"
                  size="small"
                />
              </Divider>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Nombre del contacto de emergencia"
                  type="text"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formValues.emergencia}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      emergencia: e.target.value,
                    });
                    if (formErrors.emergencia && e.target.value.trim() !== "") {
                      setFormErrors({ ...formErrors, emergencia: "" });
                    }
                  }}
                  placeholder="Ej: José María López Hernández"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <p></p>
                <MuiTelInput
                  label="Teléfono de emergencia"
                  fullWidth
                  value={emergencia}
                  variant="outlined"
                  defaultCountry="MX"
                  onChange={(e) => {
                    setEmergencia(e);
                    formValues.telef_emergencia = emergencia;
                    if (
                      formErrors.telef_emergencia &&
                      emergencia.trim() !== ""
                    ) {
                      setFormErrors({ ...formErrors, telef_emergencia: "" });
                    }
                  }}
                  inputProps={{ maxLength: 16 }}
                  error={!!formErrors.telef_emergencia}
                  helperText={formErrors.telef_emergencia || ""}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Observaciones/Indicaciones"
                  type="text"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formValues.observaciones}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      observaciones: e.target.value,
                    });
                    if (
                      formErrors.observaciones &&
                      e.target.value.trim() !== ""
                    ) {
                      setFormErrors({
                        ...formErrors,
                        observaciones: "",
                      });
                    }
                  }}
                  error={!!formErrors.observaciones}
                  helperText={formErrors.observaciones || ""}
                  placeholder="Indicaciones especiales (horario, parentesco) para el contacto de emergencia"
                />
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Departamento"
                  select
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {departamento.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Puesto"
                      select
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {puesto.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Jefe inmediato"
                      select
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {puesto.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <p></p>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Salario
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            label="Salario"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <DemoContainer components={["DatePicker"]}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={es}
                            localeText={spanishLocale}
                          >
                            <DatePicker
                              margin="normal"
                              fullWidth
                              sx={{ width: "100%" }}
                              label="Fecha de ingreso"
                              disableFuture
                              onChange={(e) => {
                                setFormValues({
                                  ...formValues,
                                  fecha_ingreso: dayjs(e),
                                });
                              }}
                              slotProps={{
                                textField: {
                                  helperText: `Antigüedad: ${dayjs().diff(
                                    formValues.fecha_ingreso,
                                    "year"
                                  )} años`,
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </DemoContainer>
                      </Grid>
                    </Grid>
                  </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre de usuario"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Confirmar contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tiempo de innactividad"
                    type="number"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">horas</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        margin="normal"
                        fullWidth
                        label="Hora de Entrada"
                        value={entradaTiempo}
                        onChange={(valor) => setEntradaTiempo(valor)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        margin="normal"
                        fullWidth
                        label="Hora de Salida"
                        value={salidaTiempo}
                        onChange={(valor) => setSalidaTiempo(valor)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        margin="normal"
                        fullWidth
                        label="Hora de Salida (COMIDA)"
                        value={salidaComidaTiempo}
                        onChange={(valor) => setSalidaComidaTiempo(valor)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        margin="normal"
                        fullWidth
                        label="Hora de Entrada (COMIDA)"
                        value={entradaComidaTiempo}
                        onChange={(valor) => setEntradaComidaTiempo(valor)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button>Cerrar</Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}