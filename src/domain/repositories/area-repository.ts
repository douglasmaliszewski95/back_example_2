import { CreateAreaDTO } from '@domain/dto/area/create-area-dto';
import { UpdateAreaDTO } from '@domain/dto/area/update-area-dto';
import { Area } from '@domain/entities/Area';

export interface AreaRepository {
  findAll(): Promise<Area[]>;

  findById(id: string): Promise<Area | null>;

  insert(entity: CreateAreaDTO): Promise<Area>;

  update(entity: UpdateAreaDTO): Promise<Area>;

  delete(id: string): Promise<void>;
}
