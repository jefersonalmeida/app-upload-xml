export type Entity<T> = {
  [id in string | number]: T;
};
