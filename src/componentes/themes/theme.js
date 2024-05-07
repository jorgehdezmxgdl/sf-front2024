import { createTheme  } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#AE7A7E', // Copper
      contrastText: '#FFF', // White Smoke for text on primary
    },
    secondary: {
      main: '#7C7F7D', // Dark Charcoal
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

