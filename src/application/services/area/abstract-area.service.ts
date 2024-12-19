import { PaginatedData } from '@application/utils/pagination';
import { CreateAreaDTO } from '@domain/dto/area/create-area-dto';
import { UpdateAreaDTO } from '@domain/dto/area/update-area-dto';
import { Area } from '@domain/entities/Area';

export abstract class AbstractAreaService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<Area>>;
  abstract findById(areaId: string): Promise<Area | null>;
  abstract delete(areaId: string): Promise<void>;
  abstract createArea(areaData: CreateAreaDTO): Promise<Area>;
  abstract updateArea(areaId: string, areaData: UpdateAreaDTO): Promise<Area>;
}
