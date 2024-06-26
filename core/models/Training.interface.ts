import { Institute } from "./Institute.interface";

export interface Training {
  id: string;
  title: string;
  englishTitle: string;
  institute: Institute;
  year: number;
  month?: number;
  image?: string;
}
