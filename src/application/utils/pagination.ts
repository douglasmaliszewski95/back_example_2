import { AppConstants } from '@infra/constants/appConstants';

export interface PaginatedData<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  maxLimit: number;
}

export function paginator<T>(data: T[], page: number, pageSize: number): PaginatedData<T> {
  if (Number.isNaN(page) || page <= 0 || parseInt(page as any) !== page) {
    page = 1;
  }

  if (Number.isNaN(pageSize) || pageSize <= 0 || parseInt(pageSize as any) !== pageSize) {
    pageSize = 15;
  }

  if (pageSize > AppConstants.maxLimitList) {
    pageSize = 50;
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedData = data.slice(startIndex, endIndex);

  return {
    data: slicedData,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    currentPage: page,
    pageSize: pageSize,
    maxLimit: AppConstants.maxLimitList,
  };
}
