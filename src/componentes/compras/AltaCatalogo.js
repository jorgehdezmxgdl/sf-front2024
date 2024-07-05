import React, { useState, useRef, useEffect, useCallback } from "react";
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
} from "@mui/material";

import PropTypes from "prop-types";
import debounce from 'lodash/debounce';

import axios from "axios";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AltaCatalogo(props) {
  const [open, setOpen]             = React.useState(true);
  const [value, setValue]           = React.useState(0);
  const [images, setImages]         = React.useState([]);
  const [paises, setPaises]         = React.useState([]);
  const [disenador, setDisenador]   = React.useState([]);
  const [ml, setMl]                 = React.useState([]);
  const [genero, setGenero]         = React.useState([]);
  const [almacen, setAlmacen]       = React.useState([]);
  const [ubicacion, setUbicacion]   = React.useState([]);
  const [tipo, setTipo]             = React.useState([]);
  const [presenta, setPresenta]     = React.useState([]);
  const [formErrors, setFormErrors] = React.useState({});


  const [producto, setProducto]     = React.useState({
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
    tipo : 0,
    presentacion: 0,
    ml: 0,
    pais: 75,
    almacen: 0,
    ubicacion: "",
    minimo: 0,
    maximo: 0,
    notascorazon: "",
    notasfondo: "",
    notassalida: ""
  });
  
  const refs = {
    nombre: useRef(null),
    disenador: useRef(null),
    barcode: useRef(null),
    alto: useRef(null),
    ancho: useRef(null),
    largo: useRef(null),
    volumen: useRef(null),
    peso: useRef(null),
    minimo: useRef(null),
    maximo: useRef(null),
    notascorazon: useRef(null),
    notasfondo: useRef(null),
    notassalida: useRef(null)
  };

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
    };
    fetchData();
  }, []);

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

  const [focusField, setFocusField] = useState(null);

  useEffect(() => {
    if (refs.descripcion.current) {
      refs.descripcion.current.focus();
    }
  }, [producto.descripcion]);

  const handleCompChange = (field) => (e) => {
    const newValue = e.target.value.toUpperCase();
    setProducto((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleBlur = () => {
    handleCalculaVolumen();
    setFocusField('volumen');
  };

  function encontrarCamposVacios() {
    const campos = Object.keys(producto);
    const camposVacios = campos.filter(
      (campo) => producto[campo] === "" || producto[campo] === null || producto[campo] === 0
    );
    return camposVacios;
  }

  const handleSubmit = (event) => {
    const errores = {};
    const camposVacios = encontrarCamposVacios();
    console.log("Campos vacíos:", camposVacios);
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
      setProducto({ ...producto, 
         volumen: volumen.toFixed(2),
          peso: peso.toFixed(2) 
      });
    } catch (error) {
      console.error("Error al buscar datos:", error);
      alert("Error al buscar datos: " + error);
    }
  };
  

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
                <Tab label="Almacen" {...a11yProps(1)} />
                <Tab label="Fotos" {...a11yProps(2)} />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="producto"
                      label="Producto"
                      autoComplete="off"
                      type="text"
                      value={producto.nombre}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleCompChange('nombre')}
                      inputRef={refs.nombre}
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
                      label="Diseñador"
                      type="text"
                      fullWidth
                      value={producto.disenador}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setProducto({ ...producto, disenador: e.target.value });
                      }}
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="barcode"
                      label="Barcode"
                      type="text"
                      value={producto.barcode}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleCompChange('barcode')}
                      inputRef={refs.barcode}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Alto"
                        fullWidth
                        value={producto.alto}
                        type="text"
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                        }}
                        onChange={handleCompChange('alto')}
                        inputRef={refs.alto}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Largo"
                        value={producto.largo}
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
                        onChange={handleCompChange('largo')}
                        inputRef={refs.largo}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Ancho"
                        value={producto.ancho}
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
                        onChange={handleCompChange('ancho')}
                        inputRef={refs.ancho}
                        onBlur={handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Volumen"
                        value={producto.volumen}
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Peso"
                        fullWidth
                        margin="normal"
                        value={producto.peso}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">gr</InputAdornment>
                          ),
                        }}
                        onChange={handleCompChange('peso')}
                        inputRef={refs.peso}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Género"
                        fullWidth
                        select
                        value={producto.genero}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setProducto({ ...producto, genero: e.target.value });
                        }}
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
                        label="Tipo"
                        fullWidth
                        select
                        value={producto.tipo}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setProducto({ ...producto, tipo: e.target.value });
                        }}
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
                        label="Presentación"
                        fullWidth
                        select
                        value={producto.presentacion}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setProducto({ ...producto, presentacion: e.target.value });
                        }}
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
                        label="ML"
                        fullWidth
                        value={producto.ml}
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setProducto({ ...producto, ml: e.target.value });
                        }}
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
                        label="País de origen"
                        value={producto.pais}
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setProducto({ ...producto, pais: e.target.value });
                        }}
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
                    <TextField
                      margin="normal"
                      id="almacen"
                      label="Almacen"
                      value={producto.almacen}
                      select
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setProducto({ ...producto, almacen: e.target.value });
                      }}
                    >
                      {almacen.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="ubicacion"
                      value={producto.ubicacion}
                      label="Ubicación"
                      fullWidth
                      select
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setProducto({ ...producto, ubicacion: e.target.value });
                      }}
                    >
                      {ubicacion.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mínimo de productos"
                        fullWidth
                        value={producto.minimo}
                        margin="normal"
                        InputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          endAdornment: (
                            <InputAdornment position="start">
                              pzs
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleCompChange('minimo')}
                        inputRef={refs.minimo}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Máximo de productos"
                        fullWidth
                        value={producto.maximo}
                        margin="normal"
                        InputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          endAdornment: (
                            <InputAdornment position="start">
                              pzs
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleCompChange('maximo')}
                        inputRef={refs.maximo}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="corazon"
                      label="Notas de corazón"
                      value={producto.notascorazon}
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleCompChange('notascorazon')}
                      inputRef={refs.notascorazon}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="fondo"
                      label="Notas de fondo"
                      value={producto.notasfondo}
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleCompChange('notasfondo')}
                      inputRef={refs.notasfondo}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="salida"
                      label="Notas de salida"
                      value={producto.notassalida}
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleCompChange('notassalida')}
                      inputRef={refs.notassalida}
                    />
                  </Grid>
                </Grid>
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
