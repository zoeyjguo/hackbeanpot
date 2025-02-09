import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
    <Card sx={{ width: 345, minHeight: 250, display: "flex", flexDirection: "column", borderRadius: 5, border: '2px solid #75ba81'}}>
      {photoUrl ? (
        <CardMedia component="img" alt={place.name} height="140" image={photoUrl}/>
      ) : (
        <Box 
          sx={{ 
            height: 140, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#e0e0e0',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No Image Found
          </Typography>
        </Box>
      )}
      <CardContent>
        <Typography variant="h5" component="div" fontFamily={"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"}>
          {place.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'right' }}>
        <Button size="small" onClick={onRemove}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
