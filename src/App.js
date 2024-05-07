import React, { useState } from 'react';
import Login from './componentes/login/Login';
import Dashboard from './componentes/dashboard/Dasboard';
import { ThemeProvider } from '@mui/material/styles';
import theme from './componentes/themes/theme';
 
function App() {

  const [screen, setScreen] = useState(0);

  const activaPantalla = (pantalla) => {
    setScreen(pantalla);
  }

  return (
    <ThemeProvider theme={theme}>
      { screen === 0 ? <Login activaPantalla={activaPantalla}  /> : <Dashboard />}
    </ThemeProvider>
  );
}

export default App;
