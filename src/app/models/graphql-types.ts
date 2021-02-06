import { Root } from './graphql-schema';

export type WatchQueryResponse<T extends keyof Root> = Pick<Root, T>;
export type EntitiesPropName<T extends keyof Root> = T;
