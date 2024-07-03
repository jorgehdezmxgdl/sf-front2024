import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Avisos = ({ avisos }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {avisos.map((aviso, index) => (
        <Typography key={index} variant="h6">
          {aviso}
        </Typography>
      ))}
    </Box>
  );
};

export default Avisos;