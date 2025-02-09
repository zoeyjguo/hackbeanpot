import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {SongListProps} from "../types/spotify.ts";
import {Typography} from "@mui/material";


export default function SongList({ songs, onDelete } : SongListProps) {
  return (
    <>
      <Typography>Preview Songs</Typography>
    <List>
      {songs.map((song, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(index)}
            >
              <DeleteIcon style={{ color: "white" }}/>
            </IconButton>
          }
          sx={{}}
        >
          <ListItemAvatar>
            <Avatar
              src={song.albumIconLink}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={song.songName}
          />
        </ListItem>
      ))}
    </List>
    </>
  )
}