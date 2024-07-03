import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Channel from './channel.jpg';

export default function Cards() {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <br />
      <CardMedia
        sx={{ height: 200, width: 200 }}
        image={Channel}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Importante
        </Typography>
        <Typography variant="body2" color="text.secondary">
           !!El perfume Channel está rebajado!!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Detalles</Button>
      </CardActions>
    </Card>
  );
}