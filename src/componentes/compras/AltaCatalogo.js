import React, { useRef } from "react";
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

import axios from "axios";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AltaCatalogo(props) {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [paises, setPaises] = React.useState([]);
  const [disenador, setDisenador] = React.useState([]);
  const [ml, setMl] = React.useState([]);
  const [producto, setProducto] = React.useState({
    largo: 0,
    ancho: 0,
    alto: 0,
    volumen: 0,
    pais: "75",
  });

  const labels = ["Portada", "Caja", "Perfume", "Ambos"];

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

  const handleCalculaVolumen = () => {
    try {
      const volumen =
        parseFloat(producto.largo) *
        parseFloat(producto.ancho) *
        parseFloat(producto.alto);
      setProducto({ ...producto, volumen: volumen.toFixed(2) });
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
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
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
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Alto"
                        value={producto.alto}
                        fullWidth
                        type="text"
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                        }}
                        onChange={(e) => {
                          setProducto({ ...producto, alto: e.target.value });
                        }}
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
                        onChange={(e) => {
                          setProducto({ ...producto, largo: e.target.value });
                        }}
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
                        onChange={(e) => {
                          setProducto({ ...producto, ancho: e.target.value });
                        }}
                        onBlur={handleCalculaVolumen}
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">gr</InputAdornment>
                          ),
                        }}
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
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Tipo"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Presentación"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="ML"
                        fullWidth
                        select
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
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
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="ubicacion"
                      label="Ubicación"
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mínimo de productos"
                        fullWidth
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
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Máximo de productos"
                        fullWidth
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
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="fondo"
                      label="Notas de fondo"
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      margin="normal"
                      id="salida"
                      label="Notas de salida"
                      type="text"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
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
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
