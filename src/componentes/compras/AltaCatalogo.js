import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  Grid,
  TextField,
  InputAdornment,
  Tab,
  Box,
  Tabs,
  Typography,
  Card,
  CardMedia,
  MenuItem,
  CardActions,
  IconButton,
  Autocomplete,
  Checkbox, Link,
} from "@mui/material";

import { styled } from '@mui/system';
import PropTypes from "prop-types";

import axios from "axios";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import PerfumeNotes from "./PerfumesNotes";
import CodigoBarras from "./CodigoBarras";


export default function AltaCatalogo(props) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [paises, setPaises] = React.useState([]);
  const [disenador, setDisenador] = React.useState([]);
  const [ml, setMl] = React.useState([]);
  const [genero, setGenero] = React.useState([]);
  const [almacen, setAlmacen] = React.useState([]);
  const [ubicacion, setUbicacion] = React.useState([]);
  const [tipo, setTipo] = React.useState([]);
  const [presenta, setPresenta] = React.useState([]);
  const [options, setOptions]    = React.useState([]);
  const [formErrors, setFormErrors] = React.useState({});
  const [selectedOptions, setSelectedOptions]   = React.useState([]);
  const [selectedOptions1, setSelectedOptions1] = React.useState([]);
  const [selectedOptions2, setSelectedOptions2] = React.useState([]);
  const [dialogData, setDialogData] = useState({ muestra: 0, titulo: "" });
  const [dialogOpen,  setDialogOpen] = useState(false); 
  const [dialogBarra, setDialogBarra] = useState(false); 
  

  const GroupHeader = styled('div')({
    backgroundColor: '#8d4925',
    color: 'white',
    padding: '2px',
  });

  const [producto, setProducto] = React.useState({
    sku: 1,
    nombre: "",
    disenador: "",
    barcode: "",
    alto: "",
    ancho: "",
    largo: "",
    volumen: "",
    peso: "",
    genero: 0,
    tipo: 0,
    presentacion: 0,
    ml: 0,
    pais: 75,
  });

  const inputRefs = useRef({});

  const labels = ["Imagen 1", "Imagen 2", "Imagen 3", "Imagen 4"];

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5784/paises`);
        const data = response.data;
        setPaises(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/disenador`);
        const data = response.data;
        setDisenador(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }

      try {
        const response = await axios.get(`http://localhost:5784/ml`);
        const data = response.data;
        setMl(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/v1/consultagral/disenadorperfume`);
        const data = response.data;
        setGenero(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/v1/consultagral/almacen`);
        const data = response.data;
        setAlmacen(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/v1/consultagral/ubicacion`);
        const data = response.data;
        setUbicacion(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/v1/consultagral/tipo`);
        const data = response.data;
        setTipo(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/v1/consultagral/presentacion`);
        const data = response.data;
        setPresenta(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const response = await axios.get(`http://localhost:5784/v1/compras/notasolfativas`);
        const data = response.data;
        setOptions(data);
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    fetchData();
  }, []);

  const memoizedOptions = React.useMemo(() => options, [options]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleCloseDialog();
    setOpen(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [
          ...prevImages,
          { src: reader.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = (index) => {
    document.getElementById(`edit-image-${index}`).click();
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleReplaceImage = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) =>
          prevImages.map((img, i) =>
            i === index ? { src: reader.result, file } : img
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = () => {
    handleCalculaVolumen();
  };
 
  function encontrarCamposVacios() {
    console.log("Producto:", producto);
    const campos = Object.keys(producto);
    const camposVacios = campos.filter(
      (campo) => producto[campo] === "" || producto[campo] === null || producto[campo] === 0 || (Array.isArray(producto[campo]) && producto[campo].length === 0)
    );
    return camposVacios;
  }

  const handleSubmit = (event) => {
    event.preventDefault();    
    const errores = {};
    const camposVacios = encontrarCamposVacios();
    selectedOptions.length === 0 && (errores['notacorazon'] = 'Seleccione al menos una nota olfativa');
    selectedOptions1.length === 0 && (errores['notafondo'] = 'Seleccione al menos una nota olfativa');
    selectedOptions2.length === 0 && (errores['notasalida'] = 'Seleccione al menos una nota olfativa');
    if (camposVacios.length > 0) {
      camposVacios.map((campo) => {
        errores[campo] = " es obligatorio este dato";
        return null;
      });
    } else {
      console.log("Información a enviar:", producto);
      axios.post("http://localhost:5784/v1/compras/catalogo", producto)
        .then((response) => {
          console.log("Respuesta del servidor:", response);
          alert("Producto registrado correctamente");
          handleClose();
        })
        .catch((error) => {
          console.error("Error al registrar producto:", error);
          alert("Error al registrar producto: " + error);
        });
    }
  };

  const handleCalculaVolumen = () => {
    try {
      const volumen =
        parseFloat(producto.largo) *
        parseFloat(producto.ancho) *
        parseFloat(producto.alto);
      const peso = volumen * 0.85;
      setProducto({
        ...producto,
        volumen: volumen.toFixed(2),
        peso: peso.toFixed(2)
      });
    } catch (error) {
      console.error("Error al buscar datos:", error);
      alert("Error al buscar datos: " + error);
    }
  };

  const handleCompChange = React.useCallback((name) => (event) => {
    const value = event.target.value;
    setProducto(prevProducto => {
      if (prevProducto[name] === value) return prevProducto;

      return {
        ...prevProducto,
        [name]: value
      };
    });
    setTimeout(() => {
      if (inputRefs.current[name]) {
        inputRefs.current[name].focus();
      }
    }, 0);
  }, []);

  const handleOpenDialog = (muestra, titulo) => {
      setDialogData({ muestra, titulo }); 
      setDialogOpen(true); 
  };
    
  const handleCloseDialog = () => {
    setDialogOpen(false); 
  };

  const handleCodigoBarras = () => {
    setDialogBarra(true);
  };

  const handleCloseCodigoBarras = () => {
    setDialogBarra(false);
  };

  const handleAdd = () => {
    handleCodigoBarras();
  };


  const textFields = useMemo(() => [
    { name: 'nombre', label: 'Nombre del Producto', type: 'text' },
    { name: 'disenador', label: 'Diseñador', type: 'int' },
    { name: 'barcode', label: 'Código Barras' },
    { name: 'alto', label: 'Alto', type: 'int' },
    { name: 'largo', label: 'Largo' },
    { name: 'ancho', label: 'Ancho' },
    { name: 'peso', label: 'Peso' },
    { name: 'genero', label: 'Género' },
    { name: 'tipo', label: 'Tipo' },
    { name: 'presentacion', label: 'Presentación' },
    { name: 'ml', label: 'ML' },
    { name: 'pais', label: 'País de Origen' },
    { name: 'almacen', label: 'Almacen' },
    { name: 'ubicacion', label: 'Ubicación' },
    { name: 'minimo', label: 'Mínimo' },
    { name: 'maximo', label: 'Máximo' },
    { name: 'notacorazon', label: 'Notas de corazón' },
    { name: 'notafondo', label: 'Notas de Fondo' },
    { name: 'notasalida', label: 'Notas de Salida' },
  ], []);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id={"id10"}>Alta de nuevo producto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Completa la siguiente información
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Datos generales" {...a11yProps(0)} />
                <Tab label="Notas olfativas" {...a11yProps(1)} />
                <Tab label="Fotos" {...a11yProps(2)} />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      autoComplete="off"
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      key={textFields[0].name}
                      name={textFields[0].name}
                      label={textFields[0].label}
                      value={producto[textFields[0].name]}
                      onChange={handleCompChange(textFields[0].name)}
                      inputRef={el => inputRefs.current['nombre'] = el}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      select
                      id="disenador"
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      key={textFields[1].name}
                      name={textFields[1].name}
                      label={textFields[1].label}
                      value={producto[textFields[1].name]}
                      onChange={handleCompChange(textFields[1].name)}
                      inputRef={el => inputRefs.current['disenador'] = el}
                    >
                      {disenador.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={7} sm={7}>
                    <TextField
                      margin="normal"
                      id="barcode"
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      key={textFields[2].name}
                      name={textFields[2].name}
                      label={textFields[2].label}
                      value={producto[textFields[2].name]}
                      onChange={handleCompChange(textFields[2].name)}
                      inputRef={el => inputRefs.current['barcode'] = el}
                    />
                  </Grid>
                  <Grid item xs={5} sm={5}>
                      <Box display="flex" alignItems="center" height="100%">
                        <Button variant="contained"
                                margin="normal"
                                fullWidth 
                                fullHeight
                                color="primary">
                          Código Temporal
                        </Button>
                      </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        type="text"
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                        }}
                        key={textFields[3].name}
                        name={textFields[3].name}
                        label={textFields[3].label}
                        value={producto[textFields[3].name]}
                        onChange={handleCompChange(textFields[3].name)}
                        inputRef={el => inputRefs.current['alto'] = el}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        fullWidth
                        type="text"
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[4].name}
                        name={textFields[4].name}
                        label={textFields[4].label}
                        value={producto[textFields[4].name]}
                        onChange={handleCompChange(textFields[4].name)}
                        inputRef={el => inputRefs.current['largo'] = el}

                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        type="text"
                        fullWidth
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[5].name}
                        name={textFields[5].name}
                        label={textFields[5].label}
                        value={producto[textFields[5].name]}
                        onChange={handleCompChange(textFields[5].name)}
                        inputRef={el => inputRefs.current['ancho'] = el}
                        onBlur={handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="text"
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">cm<sub>3</sub></InputAdornment>
                          ),
                          readOnly: true,
                        }}
                        key={"volumen"}
                        name="volumen"
                        label="Volumen"
                        value={producto.volumen}
                        inputRef={el => inputRefs.current['volumen'] = el}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">gr</InputAdornment>
                          ),
                        }}
                        key={textFields[6].name}
                        name={textFields[6].name}
                        label={textFields[6].label}
                        value={producto[textFields[6].name]}
                        onChange={handleCompChange(textFields[6].name)}
                        inputRef={el => inputRefs.current['peso'] = el}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[7].name}
                        name={textFields[7].name}
                        label={textFields[7].label}
                        value={producto[textFields[7].name]}
                        onChange={handleCompChange(textFields[7].name)}
                        inputRef={el => inputRefs.current['genero'] = el}
                      >
                        {genero.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[8].name}
                        name={textFields[8].name}
                        label={textFields[8].label}
                        value={producto[textFields[8].name]}
                        onChange={handleCompChange(textFields[8].name)}
                        inputRef={el => inputRefs.current['tipo'] = el}
                      >
                        {tipo.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[9].name}
                        name={textFields[9].name}
                        label={textFields[9].label}
                        value={producto[textFields[9].name]}
                        onChange={handleCompChange(textFields[9].name)}
                        inputRef={el => inputRefs.current['presentacion'] = el}
                      >
                        {presenta.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[10].name}
                        name={textFields[10].name}
                        label={textFields[10].label}
                        value={producto[textFields[10].name]}
                        onChange={handleCompChange(textFields[10].name)}
                        inputRef={el => inputRefs.current['ml'] = el}
                      >
                        {ml.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        key={textFields[11].name}
                        name={textFields[11].name}
                        label={textFields[11].label}
                        value={producto[textFields[11].name]}
                        onChange={handleCompChange(textFields[11].name)}
                        inputRef={el => inputRefs.current['pais'] = el}
                      >
                        {paises.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Link
                          variant="body1"
                          underline="hover"
                          rel="noopener noreferrer" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleOpenDialog(1, "Notas de corazón")}
                        >
                          <LiveHelpIcon />
                        </Link>
                    </Box>
                    <Autocomplete
                      multiple
                      options={memoizedOptions}
                      groupBy={(option) => option.categoria}
                      getOptionLabel={(option) => option.nombre}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.nombre}
                        </li>
                      )}
                      renderGroup={(params) => (
                        <li key={params.key}>
                          <GroupHeader>{params.group}</GroupHeader>
                          <ul style={{ padding: 0 }}>{params.children}</ul>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params}
                          variant="outlined"
                          placeholder="Seleccione..."
                          margin="normal"
                          key={textFields[16].name}
                          name={textFields[16].name}
                          label={textFields[16].label}                   
                          inputRef={el => inputRefs.current['notacorazon'] = el}
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      value={selectedOptions}
                      onChange={(event, newValue) => {
                        setSelectedOptions(newValue);
                      }}                     
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Link
                          variant="body1"
                          underline="hover"
                          target="_blank"
                          rel="noopener noreferrer" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleOpenDialog(2, "Notas de fondo")}
                        >
                          <LiveHelpIcon />
                        </Link>
                    </Box>
                    <Autocomplete
                      multiple
                      options={memoizedOptions}
                      groupBy={(option) => option.categoria}
                      getOptionLabel={(option) => option.nombre}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.nombre}
                        </li>
                      )}
                      renderGroup={(params) => (
                        <li key={params.key}>
                          <GroupHeader>{params.group}</GroupHeader>
                          <ul style={{ padding: 0 }}>{params.children}</ul>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params}
                          variant="outlined"
                          key={textFields[17].name}
                          name={textFields[17].name}
                          label={textFields[17].label}                   
                          inputRef={el => inputRefs.current['notafondo'] = el}
                          placeholder="Seleccione..."
                          margin="normal"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      value={selectedOptions1}
                      onChange={(event, newValue) => {
                        setSelectedOptions1(newValue);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Link
                          variant="body1"
                          underline="hover"
                          style={{ cursor: 'pointer' }}
                          rel="noopener noreferrer" 
                          onClick={() => handleOpenDialog(3, "Notas de salida")} 
                        >
                          <LiveHelpIcon />
                        </Link>
                    </Box>
                    <Autocomplete
                      multiple
                      options={memoizedOptions}
                      groupBy={(option) => option.categoria}
                      getOptionLabel={(option) => option.nombre}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.nombre}
                        </li>
                      )}
                      renderGroup={(params) => (
                        <li key={params.key}>
                          <GroupHeader>{params.group}</GroupHeader>
                          <ul style={{ padding: 0 }}>{params.children}</ul>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params}
                          variant="outlined"
                          placeholder="Seleccione..."
                          margin="normal"
                          key={textFields[18].name}
                          name={textFields[18].name}
                          label={textFields[18].label}                   
                          inputRef={el => inputRefs.current['notasalida'] = el}
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      value={selectedOptions2}
                      onChange={(event, newValue) => {
                        setSelectedOptions2(newValue);
                      }}
                    />
                  </Grid>
                </Grid>
                <PerfumeNotes 
                    open={dialogOpen} 
                    muestra={dialogData.muestra} 
                    titulo={dialogData.titulo} 
                    onClose={handleCloseDialog} 
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    Galería de imágenes
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Por favor, sube las 4 imágenes requeridas para este producto
                  </Typography>
                  <Grid container spacing={2}>
                    {images.map((image, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={image.src}
                            alt={`uploaded-${index}`}
                          />
                          <Typography variant="subtitle2" align="center">
                            {labels[index]}
                          </Typography>
                          <CardActions>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              id={`edit-image-${index}`}
                              onChange={(e) => handleReplaceImage(e, index)}
                            />
                            <IconButton onClick={() => handleEditImage(index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteImage(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                    {images.length < 4 && (
                      <Grid item xs={12} sm={6} md={3}>
                        <Button
                          variant="contained"
                          component="label"
                          fullWidth
                          startIcon={<AddPhotoAlternateIcon />}
                        >
                          {`Agregar ${labels[images.length]}`}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageUpload}
                          />
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </CustomTabPanel>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cerrar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
