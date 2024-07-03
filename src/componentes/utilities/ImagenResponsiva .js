import Box from '@mui/material/Box';

const ImagenResponsiva = ({ src, alt }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '0px'
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          height: '940px',
          width: '100%'
        }}
      />
    </Box>
  );
};

export default ImagenResponsiva;