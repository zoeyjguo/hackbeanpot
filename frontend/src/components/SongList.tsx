import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { SongListProps } from "../types/spotify.ts";
import { Typography, Box } from "@mui/material";

export default function SongList({ songs }: SongListProps) {
  if (songs.length === 0) {
    return <></>;
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          marginTop: "20px",
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Playlist
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: '600px', // Make the list wider
          bgcolor: 'transparent',
          borderRadius: '5px',
          border: '2px solid #75ba81',
          boxShadow: 3,
          '&:hover': {
            boxShadow: "0px 10px 50px 10px rgba(9, 115, 32, 0.25)",
          },
        }}
      >
        {songs.map((song, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: '1px solid #ddd',
              paddingLeft: 2,
              paddingRight: 2,
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: '#f4f4f4',
              },
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 150,
                backgroundImage: `url(${song.albumIconLink})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2, // optional for rounded corners
                marginRight: 2,
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <ListItemText
                primary={song.songName}
                sx={{
                  color: '#333',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#757575',
                }}
              >
                {song.songURI} {/* Display song URI */}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
}
