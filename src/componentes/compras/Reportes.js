import React from 'react';
import { Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Compras from './reportes/Compras';
import Costos from './reportes/Costos';
import Utilidad from './reportes/Utilidad';

export default function RepCompra() {
    const [opcion, setOption] = React.useState(0);

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleClickReport = (value) => {
        setOption(value);
    };

    const ComponentMap = {
        1: Utilidad,
        2: Costos,
        3: Compras
    };

    const ComponentToShow = ComponentMap[opcion] || null;

    return (
        <div>
            <Grid container spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={() => handleClickReport(1)}>
                        Márgenes de utilidad
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={() => handleClickReport(2)}>
                        Costos
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={() => handleClickReport(3)}>
                        Compras
                    </Button>
                </Grid>
            </Grid>
            <br />
            {ComponentToShow ? <ComponentToShow /> : null}
        </div>
    );
}
