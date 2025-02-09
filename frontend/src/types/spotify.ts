export interface Song {
  songURI: string;
  songName: string;
  albumIconLink: string;
  artistName: string;
  albumRelease: string;
  albumName: string;
  release_date: string;
  artistURI: string;
}

export interface SongListProps {
  songs: Song[];
  onDelete: (index: number) => void;
}
