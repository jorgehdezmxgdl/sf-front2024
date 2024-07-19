import * as React from 'react';
import { Box, Grid, Paper, Typography, TextField, MenuItem, Button, Slider } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const filterOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export default function Filtros() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [priceRange, setPriceRange] = React.useState([20, 50]);
  const [selectedOption, setSelectedOption] = React.useState('');

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilter = () => {
    // Lógica para aplicar los filtros
    console.log({ startDate, endDate, priceRange, selectedOption });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Inicio"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Fin"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography id="price-range-slider" gutterBottom>
            Rango de Precios
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={300}
            max={7000}
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" color="textSecondary" align="center">
            {`Precio: ${priceRange[0]} - ${priceRange[1]}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Seleccionar disenador"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            fullWidth
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3} alignItems={"right"}>
          <Button variant="contained" color="primary" onClick={handleFilter} fullWidth>
            Aplicar Filtros
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
