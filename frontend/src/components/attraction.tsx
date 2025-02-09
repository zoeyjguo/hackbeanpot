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

  const isOpen = place.opening_hours?.isOpen() ?? false;
  const openingStatus = isOpen ? "Open Now" : "Closed";

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        border: '2px solid #75ba81',
        boxShadow: 3,
        '&:hover': {
          boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.25)",
        },
        position: 'relative',
        width: '100%',
        minHeight: 150,
      }}
    >
      {photoUrl ? (
        <CardMedia
          component="img"
          alt={place.name}
          image={photoUrl}
          sx={{
            width: 200,
            height: 150,
            borderRadius: '5px 0 0 5px',
          }}
        />
      ) : (
        <Box
          sx={{
            width: 200,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px 0 0 5px',
          }}
        >
          <Typography variant="body2" sx={{ color: '#757575' }}>
            No Image Available
          </Typography>
        </Box>
      )}

      <Box sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'left',
          }}
        >
          {place.name}
        </Typography>

        <Typography sx={{ color: '#757575', textAlign: 'left' }}>
          {place.vicinity ? `Location: ${place.vicinity}` : 'Location: Not available'}
        </Typography>
        <Typography sx={{ color: '#757575', textAlign: 'left' }}>
          {`Rating: ${place.rating} (${place.user_ratings_total} reviews)`}
        </Typography>
        <Typography
          sx={{
            color: isOpen ? '#2E7D32' : '#D32F2F',
            textAlign: 'left',
            fontWeight: 'bold'
          }}
        >
          {`Opening Status: ${openingStatus}`}
        </Typography>

        <Button
          size="small"
          onClick={onRemove}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: '#e53935',
            fontSize: '1.2rem',
            textTransform: 'none',
            padding: '0',
          }}
        >
          ✖
        </Button>
      </Box>
    </Card>
  );
}
