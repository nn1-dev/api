const normalizeName = (s: string) => s.trim();
const normalizeEmail = (s: string) => s.trim().toLowerCase();

const chunkArray = <T>(array: T[], size: number) =>
  array.reduce<T[][]>(
    (chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      chunks[chunkIndex].push(item);
      return chunks;
    },
    Array.from({ length: Math.ceil(array.length / size) }).map(() => []),
  );

export { normalizeName, normalizeEmail, chunkArray };
