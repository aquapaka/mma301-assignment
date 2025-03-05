import Fuse from "fuse.js";

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // ignoreDiacritics: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
};

export function fuzzySearch(
  list: any[],
  keys: string[],
  searchPattern: string
) {
  const optionsWithKeys = { ...fuseOptions, keys };
  const fuse = new Fuse(list, optionsWithKeys);

  return fuse.search(searchPattern);
}
