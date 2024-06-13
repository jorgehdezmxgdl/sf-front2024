import {
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";

import './espera.css';

const DialogoEspera = ({ open }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
          sx: {
            width: 300,
            height: 300,
          },
        }}
      aria-labelledby="loading-dialog"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#212F3C"
        }}
      >
        <div id="page">
          <div id="container">
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="h3">
              <Typography variant="body1" style={{ marginTop: "13px" }}>
                Espere un momento...
              </Typography>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogoEspera;
