export type TrackItem = {
  /**
   * URL to listen the track preview.
   */
  preview_url: string;
  name: string;
  id: string;
};

type TrackItems = {
  track: TrackItem;
}[];

export type Tracks = {
  limit: number;
  /**
   * URL to get next playlist track results.
   */
  next: string | null;
  /**
   * Current track position on request.
   */
  offset: number;
  /**
   * URL to get previous playlist track results.
   */
  previous: string | null;
  /**
   * Current track results URL.
   */
  href: string;
  total: number;
  items: TrackItems;
};

type PlaylistImage = {
  /**
   * Playlist image url
   */
  url: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  tracks: Pick<Tracks, 'total'>;
  images: PlaylistImage[];
};
