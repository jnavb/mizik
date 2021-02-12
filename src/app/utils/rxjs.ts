import { from, Observable } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';

export function groupArrayBy<T>(
  arr: T[],
  prop: keyof T
): Observable<{ key: T[keyof T]; values: T[] }[]> {
  return from(arr).pipe(
    groupBy(el => el[prop]),
    mergeMap(group =>
      group.pipe(
        reduce(
          (acc, cur) => {
            acc.values.push(cur);
            return acc;
          },
          { key: group.key, values: [] }
        )
      )
    ),
    toArray()
  );
}
