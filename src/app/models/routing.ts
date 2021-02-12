import { Entities, Id } from './util-types';

export type Routes = detail | list | home | favorites;

type home = ['home'];
type favorites = ['favorites'];
type detail = [Entities, Id];
type list = [Entities];

export interface QParams {
  id?: Id;
  entity?: Entities;
}
