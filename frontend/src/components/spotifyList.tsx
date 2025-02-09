import {useEffect, useState} from "react";
import Navbar from "./navbar";
import { Box, Button } from "@mui/material";
import SongList from "./SongList.tsx";
import {Song} from "../types/spotify.ts";

const Playlist = () => {
    const [attractions, setAttractions] = useState(["att1", "att2", "att3"]);
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
      return () => {
        fetchGeneratedSongs();
      };
    }, []);


    const fetchGeneratedSongs = () => {
        fetch('http://localhost:8080/getGeneratedSongs', {
            method: 'GET'
        })
          .then(response => {
              if (response.ok) {
                  console.log("SUCCESS: fetched generated songs");
                  return response.json()
              } else {
                  console.log("ERROR: unable to fetch generated songs");
                  return;
              }
          })
          .then(data => setSongs(data.spotifySongsList))
    }



    const searchSong = (wildcard: string, searchParamGenre : string, searchParamNum : number) => {
        fetch('http://localhost:8080/searchSongs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wildcard: wildcard,
                genre: searchParamGenre,
                numSongs: searchParamNum
            })
        })
          .then(response => {
              if (!response.ok) {
                  console.log("Error in searchSong request");
              } else {
                  console.log("Songs found!")
                  return response.json();
              }
          })
          .then(data => setSongs(data))
          .catch(error => console.error('Error:', error));
    }

    const handleSearchSongs = () => {
        searchSong("anything", "classical", 5);
    }

    const handleDelete = (index : number) => {
        setSongs((prevSongs) => prevSongs.filter((_, i) => i !== index))
    };

    const handleAddSong = async () => {
        await createPlaylist();
        console.log("Songs are now:", songs);
        addSongs(songs);
    }

    const addSongs = (songsToAdd : Song[]) => {
        fetch('http://localhost:8080/addSong', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                songs: songsToAdd
            })
        })
          .then(response => {
              if (response.ok) {
                  console.log("Successfully added song(s)");
              } else {
                  console.log("ERROR: unable to add song(s)");
              }
          })
          .catch(error => console.error('Error:', error));
    }

    const handleStoreAttractions = () => {
        fetch('http://localhost:8080/addAttractions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                attractions: attractions
            })
        })
          .then(response => {
              if (response.ok) {
                  console.log("Successfully stored attraction(s)");
              } else {
                  console.log("ERROR: unable to store attraction")
              }
          })
          .catch(error => console.error('Error:', error));
    }

    const handleGetAttractions = () => {
        fetch('http://localhost:8080/getAttractions', {
            method: 'GET',
        })
          .then(response => {
              if (response.ok) {
                  console.log("Successfully got attraction(s)");
                  return response.json();
              } else {
                  console.log("ERROR: unable to get attraction")
              }
          })
          .then(attractions => setAttractions(attractions))
          .catch(error => console.error('Error:', error));
    }

    const createPlaylist = async () => {
        const response = await fetch('http://localhost:8080/createPlaylist', {
            method: 'POST'
        })

        if (response.ok) {
            console.log("Created playlist")
            console.log(response.status)
        } else {
            console.log("ERROR: unable to create playlist")
            console.log(response.status)
        }
    }

    return (
        <Box sx={{ minHeight: "100vh", padding: 3 }}>
            <Navbar />
            {/* box container that has items horzizontall center and stacked vertically */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <SongList songs={songs} onDelete={handleDelete}/>
                <Button type={"button"} onClick={handleSearchSongs}>Search song!!</Button>
                <Button type={"button"} onClick={handleAddSong}>Add songs to playlist</Button>
            </Box>
            <Button type={"button"} onClick={handleStoreAttractions}>store attractions</Button>
            <Button type={"button"} onClick={handleGetAttractions}>Get Attractions</Button>
        </Box>
    )
};

export default Playlist;
