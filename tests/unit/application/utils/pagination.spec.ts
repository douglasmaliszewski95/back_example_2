import { paginator, PaginatedData } from '@application/utils/pagination';

describe('paginator', () => {
  it('should paginate data correctly', () => {
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
    const pageSize = 10;
    const page = 2;

    const result: PaginatedData<number> = paginator(data, page, pageSize);

    expect(result.currentPage).toBe(page);
    expect(result.pageSize).toBe(pageSize);
    expect(result.maxLimit).toBe(50);
    expect(result.totalItems).toBe(100);
    expect(result.totalPages).toBe(10);
    expect(result.data.length).toBe(pageSize);
    expect(result.data[0]).toBe(11);
    expect(result.data[result.data.length - 1]).toBe(20);
  });

  it('should default to page 1 if invalid page number is provided', () => {
    const data = Array.from({ length: 20 }, (_, i) => i + 1);
    const pageSize = 10;
    const invalidPage = -1;

    const result: PaginatedData<number> = paginator(data, invalidPage, pageSize);

    expect(result.currentPage).toBe(1);
    expect(result.pageSize).toBe(pageSize);
    expect(result.maxLimit).toBe(50);
    expect(result.totalItems).toBe(20);
    expect(result.totalPages).toBe(2);
    expect(result.data.length).toBe(pageSize);
    expect(result.data[0]).toBe(1);
    expect(result.data[result.data.length - 1]).toBe(10);
  });

  it('should default to default page size if invalid page size is provided', () => {
    const data = Array.from({ length: 20 }, (_, i) => i + 1);
    const invalidPageSize = -10;
    const page = 2;

    const result: PaginatedData<number> = paginator(data, page, invalidPageSize);

    expect(result.currentPage).toBe(page);
    expect(result.pageSize).toBe(15);
    expect(result.maxLimit).toBe(50);
    expect(result.totalItems).toBe(20);
    expect(result.totalPages).toBe(2);
    expect(result.data.length).toBe(5);
    expect(result.data[0]).toBe(16);
    expect(result.data[result.data.length - 1]).toBe(20);
  });

  it('should adjust page size if it exceeds the maximum limit', () => {
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
    const pageSize = 60;
    const page = 2;

    const result: PaginatedData<number> = paginator(data, page, pageSize);

    expect(result.currentPage).toBe(page);
    expect(result.pageSize).toBe(50);
    expect(result.maxLimit).toBe(50);
    expect(result.totalItems).toBe(100);
    expect(result.totalPages).toBe(2);
    expect(result.data.length).toBe(50);
    expect(result.data[0]).toBe(51);
    expect(result.data[result.data.length - 1]).toBe(100);
  });
});
