import SendIcon from "@mui/icons-material/Send";
import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import ReCAPTCHA from "react-google-recaptcha";

import * as React from "react";

import axios from "axios";

import theme from "../themes/theme";
import logo from "./fondo3.webp";
import milogo from "./milogo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://solofragancias.com.mx/"
        target="_blank"
      >
        Sólo Fragancias
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide(props) {
  const [open, setOpen] = React.useState(false);
  const [mopen, setMOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [merror, setMError] = React.useState("");
  const [valor, setValor] = React.useState(0);

  const [pass1, setPass1] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [error1, setError1] = React.useState(false);
  const [error2, setError2] = React.useState(false);

  const recaptchaRef = React.useRef();

  React.useEffect(() => {
    const currentUrl = window.location.href;
    try {
      const params = new URLSearchParams(currentUrl.match(/\?.*/)[0]);
      if (params.get("action")) {
        setValor(1);
      } else {
        setValor(0);
      }
    } catch (error) {
      setValor(0);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setError(false);
    setEmail("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMOpen(false);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || email === null) {
      setError(true);
      setOpen(true);
      return;
    } else {
      const data = { correo: email };
      console.log("dsfdf", data);
      await axios
        .post("http://127.0.0.1:5784/send-email", data)
        .then((response) => {
          if (response.status === 204) {
            setMessage("Usuario/Contraseña no válidos...");
            setMError("error");
            setMOpen(true);
            return;
          } else if (response.status === 200) {
            setMessage(
              "Si tu correo es válido, recibirás las instrucciones para reestablecer tu contraseña.."
            );
            setMError("success");
            setMOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setError(false);
      setOpen(false);
    }
  };

  const handlePassword = (event) => {
    event.preventDefault();
    if (pass1.trim() === "" || pass1 === null) {
      setError1(true);
      setMOpen(true);
      setMError("error");
      setMessage("Ingresa la nueva contraseña");
    } else if (pass2.trim() === "" || pass2 === null) {
      setError2(true);
      setMOpen(true);
      setMError("error");
      setMessage("Ingresa la nueva contraseña");
    } else if (pass1 !== pass2) {
      setMOpen(true);
      setMError("error");
      setMessage("Las contraseñas son distintas, favor de corregirlo");
    } else {
      setError1(false);
      setError2(false);
      setValor(2);
      setMError("success");
      setMessage("Se ha reestablecido tu contraseña");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = { user: data.get("clave"), password: data.get("password") };
    //const token = await recaptchaRef.current.executeAsync();
    //console.log(info, token);

    await axios
      .post("http://127.0.0.1:5784/login", info)
      .then((response) => {
        console.log(response.status, "ok");
        if (response.status === 204) {
          setMessage("Usuario/Contraseña no válidos...");
          setMOpen(true);
          setMError("error");
          return;
        } else if (response.status === 200) {
          const id = response.data.id;
          switch (id) {
            case 2:
              props.activaPantalla(1);
              break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {valor === 0 ? (
        <div>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${logo})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={milogo} alt="logo" />
                <br />
                <Typography component="h3" variant="3">
                  Completa los siguientes campos, para acceder a la plataforma
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="clave"
                    label="Clave"
                    name="clave"
                    autoComplete="off"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="off"
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Ingresar al sistema
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2" onClick={handleClickOpen}>
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
            }}
          >
            <DialogTitle>Recuperar contraseña</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ingresa el correo electrónico asociado a tu cuenta para
                recuperar tu contraseña
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error && e.target.value.trim() !== "") {
                    setError(false);
                  }
                }}
                label="Correo electrónico"
                type="email"
                autoComplete="off"
                fullWidth
                variant="standard"
                error={error}
                helperText={error ? "Este campo es obligatorio" : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                type="submit"
                onClick={handleSendEmail}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Enviar solicitud
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : valor === 1 ? (
        <Grid item xs={12} sm={9} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <br />
            <img src={milogo} alt="logo" />
            <br />
            <Typography component="h3" variant="3">
              Ingresa tu nueva contraseña
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={pass1}
                name="password1"
                label="Contraseña"
                type="password"
                id="password1"
                autoComplete="off"
                onChange={(e) => {
                  setPass1(e.target.value);
                  if (error1 && e.target.value.trim() !== "") {
                    setError1(false);
                  }
                }}
                error={error1}
                helperText={error1 ? "Este campo es obligatorio" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={pass2}
                onChange={(e) => {
                  setPass2(e.target.value);
                  if (error2 && e.target.value.trim() !== "") {
                    setError2(false);
                  }
                }}
                name="password2"
                label="Confirmar Contraseña"
                type="password"
                id="password2"
                autoComplete="off"
                error={error2}
                helperText={error2 ? "Este campo es obligatorio" : ""}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlePassword}
              >
                Aplicar cambio
              </Button>
            </Box>
          </Box>
        </Grid>
      ) : (
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={milogo} alt="logo" />
          <br />
          <br />
          <br />
          <Link href="http://localhost:3000" underline="hover">
            Ir a la página principal
          </Link>
        </Box>
      )}
      <Snackbar
        open={mopen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={merror}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
