import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface AttractionProps {
  place: google.maps.places.PlaceResult;
  onRemove: () => void;
}

export default function Attraction({ place, onRemove }: AttractionProps) {
    const photo = place.photos?.[0];
    const photoUrl = photo ? photo.getUrl({ maxWidth: 400 }) : null;

  return (
    <Card
  sx={{
    width: 345,
    minHeight: 250,
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    border: '2px solid #75ba81',
    boxShadow: 3,
    '&:hover': {
        boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.25)",
    },
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
  }}
>
  {photoUrl ? (
    <CardMedia
      component="img"
      alt={place.name}
      height="140"
      image={photoUrl}
      sx={{
        borderRadius: '5px 5px 0 0',
        width: 345,
        minHeight: 250,
      }}
    />
  ) : (
    <Box
      sx={{
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px 5px 0 0',
      }}
    >
      <Typography variant="body2" sx={{ color: '#757575' }}>
        No Image Available
      </Typography>
    </Box>
  )}

  <Typography
    sx={{
      position: 'absolute',
      top: 10,
      left: 10,
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5px',
      borderRadius: '3px',
    }}
  >
    {place.name}
  </Typography>
<Button
    size="small"
    onClick={onRemove}
    sx={{
      position: 'absolute',
      top: 1,
      right: 1,
      "&:focus": { outline: "none" },
      color: '#e53935',
      fontSize: '1.2rem', // Larger X
      textTransform: 'none',
      padding: '0',
    }}
  >
    ✖
  </Button>
    </Card>
  );
}
