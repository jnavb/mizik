export type Nullable<T> = T | null;
export enum Entities {
  PEOPLE = 'people',
  FILMS = 'films',
  PLANETS = 'planets',
  SPECIES = 'species',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles'
}

export interface Trivia {
  question: string;
  answer: string;
}

export type Id = string;
