import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { SongListProps } from "../types/spotify.ts";
import { Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function SongList({ songs, onDelete }: SongListProps) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          marginTop: "20px",
          fontWeight: 'bold',
          color: '#333',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        Playlist
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: '900px',
          bgcolor: 'transparent',
          borderRadius: '10px',
          border: '2px solid #75ba81',
          boxShadow: 6,
          '&:hover': {
            boxShadow: "0px 15px 50px rgba(9, 115, 32, 0.3)",
          },
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {songs.map((song, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: '1px solid #ddd',
              paddingLeft: 3,
              paddingRight: 3,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#e8f5e9',
                transform: 'scale(1.02)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(index)}
                sx={{
                  color: '#e53935',
                  '&:hover': {
                    color: '#d32f2f',
                  },
                    "&:focus": {
                                outline: "none",
                            },
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Box
              sx={{
                width: 150,
                height: 150,
                backgroundImage: `url(${song.albumIconLink})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                marginRight: 3,
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <ListItemText
                primary={song.songName}
                sx={{
                  color: '#333',
                  fontWeight: 'bold',
                    borderRadius: '10px',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#757575',
                }}
              >
                {song.artistName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#757575',
                }}
              >
                {song.albumRelease}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
}
