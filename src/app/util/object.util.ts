export class ObjectUtil {
  public static groupByKey<T, K extends keyof T>(
    array: T[],
    key: K
  ): Map<T[K], T[]> {
    const map = new Map<T[K], T[]>();
    array.forEach((item) => {
      const itemKey = item[key];
      if (!map.has(itemKey)) {
        map.set(
          itemKey,
          array.filter((i) => i[key] === item[key])
        );
      }
    });
    return map;
  }
}
