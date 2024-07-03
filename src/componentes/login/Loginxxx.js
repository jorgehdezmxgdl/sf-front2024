import React, { useRef } from 'react';
import { Container, Box, Typography, TextField, Button, Link, Grid, Paper } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LockIcon from '@mui/icons-material/Lock';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from './logo2.jpeg'; // Asegúrate de que el nombre coincida con el nombre del archivo de imagen



const onChange = (value) => {
  console.log('Captcha value:', value);
};

const Login = () => {

    const recaptchaRef = React.useRef(null);
    
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper elevation={6} sx={{ p: 4, borderRadius: '16px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Clave"
                  label="Clave"
                  name="Clave"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <AssignmentIndIcon position="start" />
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  InputProps={{
                    startAdornment: (
                      <LockIcon position="start" />
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 1 }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Lf_zAYqAAAAAG-b_pEv1szSpqt5BIOFbTkOi05S"
                    onChange={onChange}
                    lg="es-419"
                    size="normal"
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="normal"
                >
                  Acceder
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Olvidé la contraseña
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Login;
