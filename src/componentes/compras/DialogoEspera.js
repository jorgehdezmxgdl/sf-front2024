import { Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';

const DialogoEspera = ({ open }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="loading-dialog"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ marginTop: '16px' }}>
            Procesando la información.....
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default DialogoEspera;