import { createTheme  } from '@mui/material/styles';

//https://www.cdmon.com/es/apps/tabla-colores

const theme = createTheme({
  palette: {
    primary: {
      main: '#4682B4', // Copper
      contrastText: '#fff', // White Smoke for text on primary
    },
    secondary: {
      main: '#574E40', // Dark Charcoal
    },
    background: {
      default: '#EDEDED', // Off-White
      paper: '#F5F5F5', // White Smoke
    },
    text: {
      primary: '#333333', // Dark Charcoal
      secondary: '#4D4D4D', // Dark Gray
      disabled: '#1A1A1A', // Black Shade
    }
  },
  // You can also define shadows and other theme aspects here
});

export default theme;

