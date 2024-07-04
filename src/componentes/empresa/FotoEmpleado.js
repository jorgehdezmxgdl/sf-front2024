import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Webcam from "react-webcam";

export default function FotoEmpleado(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const fileInputRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    props.handleFoto(imageSrc);
  }, [webcamRef, setImgSrc]);

  const [openV, setOpenV]       = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const closeV = () => {
    setOpenV(false);
  }
  
  const mopen = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSaveDialog = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target.result); 
      };
      reader.readAsDataURL(file);
    }
  }


  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    try {
      const result = await readFileAsDataURL(file);
      setImgSrc(result);
      props.handleFoto(result);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const videoConstraints = {
    width: 150,
    height: 150,
    facingMode: "user",
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
        <Avatar alt="Foto del empleado" src={imgSrc}  sx={{ width: 100, height: 100 }} />
         <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Agregar foto
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={mopen}
              onClose={handleClose}
            >
            <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }} 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
              <MenuItem onClick={handleClickOpen}>Capturar foto desde WEBCAM</MenuItem>
              <MenuItem onClick={handleButtonClick}>Seleccionar archivo</MenuItem>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={onFileChange}
            />
            </Menu>
        </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Tomar foto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ajuste su rostro en el recuadro y presione el botón para tomar la
            foto.
          </DialogContentText>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <Button onClick={capture}>Tomar foto</Button>
              )}
            </Webcam>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Avatar
              alt="Foto del empleado"
              src={imgSrc}
              sx={{ width: 150, height: 150 }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveDialog}>Guardar foto</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
}