export type ReturnViewModel<T> = {
  pagesCount: number;
  page: number;
  pageSize: number | string;
  totalCount: number;
  filterValues: string[];
  items: T | null;
};
