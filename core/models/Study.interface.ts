export interface Study {
    id: string;
    title: string;
    institute: string;
    place: string;
    since: number;
    until: number | null;
    current: boolean;
  }
  