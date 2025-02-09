export interface Song {
  songURI: string
  songName: string,
  albumIconLink: string
}

export interface SongListProps {
  songs: Song[];
  onDelete: (index: number) => void;
}