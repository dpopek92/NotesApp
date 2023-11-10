export interface ISearchParams {
  pageNumber: number;
  itemsPerPage: number;
}

export interface ISearchResult<T> {
  content: T[];
  searchParams: ISearchParams;
  totalItems: number;
}
