import { gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Entities } from './util-types';

const ALL_FILMS = `{
  allFilms {
   films {
     episodeID
     title
     director
   }
 }
 }`;
const ALL_PEOPLE = `{
  allPeople {
    people {
      id
      name
      homeworld {
        id
        name
      }
    }
  }
  }`;
const ALL_PLANETS = `{
  allPlanets {
    planets {
      id
      name
      population
    }
  }
  }`;
const ALL_SPECIES = `{
  allSpecies {
    species {
      id
      name
      designation
    }
  }
}
`;
const ALL_STARSHIPS = `{
  allStarships {
    starships {
      id
      name
      model
    }
  }
}
`;
const ALL_VEHICLES = `{
  allVehicles {
    vehicles {
      id
      name
      model
    }
  }
}
`;

const LIST: { [key in Entities]: DocumentNode } = {
  FILMS: gql(ALL_FILMS),
  PEOPLE: gql(ALL_PEOPLE),
  PLANETS: gql(ALL_PLANETS),
  SPECIES: gql(ALL_SPECIES),
  STARSHIPS: gql(ALL_STARSHIPS),
  VEHICLES: gql(ALL_VEHICLES)
};

export const QUERIES = {
  LIST
};
