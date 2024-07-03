import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ListaEventos = ({ eventos }) => {
  return (
    <List>
      {eventos.map((evento, index) => (
        <ListItem key={index}>
          <ListItemText primary={evento.title} secondary={evento.time} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListaEventos;