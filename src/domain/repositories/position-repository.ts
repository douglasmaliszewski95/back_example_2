import { CreatePositionDTO } from '@domain/dto/position/create-position-dto';
import { UpdatePositionDTO } from '@domain/dto/position/update-position-dto';
import { Position } from '@domain/entities/Position';

export interface PositionRepository {
  findAll(): Promise<Position[]>;

  findById(id: string): Promise<Position | null>;

  insert(entity: CreatePositionDTO): Promise<Position>;

  update(entity: UpdatePositionDTO): Promise<Position>;

  delete(id: string): Promise<void>;
}
