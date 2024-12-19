import { PaginatedData } from '@application/utils/pagination';
import { CreatePositionDTO } from '@domain/dto/position/create-position-dto';
import { UpdatePositionDTO } from '@domain/dto/position/update-position-dto';
import { Position } from '@domain/entities/Position';

export abstract class AbstractPositionService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<Position>>;
  abstract findById(positionId: string): Promise<Position | null>;
  abstract delete(positionId: string): Promise<void>;
  abstract createPosition(positionIdData: CreatePositionDTO): Promise<Position>;
  abstract updatePosition(positionId: string, positionIdData: UpdatePositionDTO): Promise<Position>;
}
