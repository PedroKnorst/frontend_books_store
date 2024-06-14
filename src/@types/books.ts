import { ISalesperson } from './salesperson';

export enum BookCategory {
  HORROR = 'Terror',
  ROMANCE = 'Romance',
  SCIENCEFICTION = 'Ficção Científica',
  REMAKE = 'Reeleitura',
  CRIME = 'Crime',
  INFANTIL = 'Infantil',
  FILOSOFIC = 'Filosófico',
  HISTORIC = 'História',
  ACTION = 'Ação',
  OTHER = 'Outro',
}

export interface IMarvelComicBook {
  title: string;
  description: string;
  authors: string[];
  characters: string[];
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  salespersonId: string;
  Salesperson: ISalesperson;
}

export interface ICreateBook {
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  salespersonId: string;
  category: BookCategory;
}

export interface IGetBooksWithFilterParams {
  page: number;
  size: number;
}
