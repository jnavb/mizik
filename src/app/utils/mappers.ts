import { ItemList } from '../list/list.page';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle
} from '../models/graphql-schema';

export const personToItemList = ({ id, name, homeworld }: Person): ItemList => {
  return {
    id,
    title: name,
    subtitle: homeworld.name
  };
};

export const filmToItemList = ({ id, title, director }: Film): ItemList => {
  return {
    id,
    title,
    subtitle: director
  };
};

export const planetsToItemList = ({
  id,
  name,
  population
}: Planet): ItemList => {
  return {
    id,
    title: name,
    subtitle: `${population} population`
  };
};

export const specieToItemList = ({
  id,
  name,
  designation
}: Species): ItemList => {
  return {
    id,
    title: name,
    subtitle: designation
  };
};

export const starshipToItemList = ({ id, name, model }: Starship): ItemList => {
  return {
    id,
    title: name,
    subtitle: model
  };
};

export const vehicleToItemList = ({ id, name, model }: Vehicle): ItemList => {
  return {
    id,
    title: name,
    subtitle: model
  };
};
