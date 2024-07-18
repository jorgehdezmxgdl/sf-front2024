import React from 'react';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { TextField, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function CodigoBarras(props) {
    const [text, setText] = React.useState('');
    const [rows, setRows] = React.useState([]);

    const handleAdd = () => {
        setRows([...rows, { text }]);
        setText('');
    };

    return (
        <Dialog open={props.dialogBarra} onClose={props.handleCloseCodigoBarras} aria-labelledby={"idcodigobarras"}>
            <DialogTitle id={"codigobarras"}>
                Vincular código de barras con SKU
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Código de barras"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" onClick={handleAdd}>
                                    Añadir
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TableContainer component={Paper} style={{ marginTop: 20 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Listado de código de barras</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.text}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.handleCloseCodigoBarras}
                    color="primary"
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CodigoBarras;