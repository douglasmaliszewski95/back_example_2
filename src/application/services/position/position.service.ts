import { CreatePositionDTO } from '@domain/dto/position/create-position-dto';
import { AbstractPositionService } from './abstract-position.service';
import { Position } from '@domain/entities/Position';
import AppError from '@domain/exceptions/AppError';
import { PositionRepository } from '@domain/repositories/position-repository';
import { NOT_FOUND } from 'http-status';
import { UpdatePositionDTO } from '@domain/dto/position/update-position-dto';
import { PaginatedData, paginator } from '@application/utils/pagination';

export class PositionService implements AbstractPositionService {
  constructor(private positionRepository: PositionRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<Position>> {
    const positions = await this.positionRepository.findAll();

    const paginatedPositions = paginator(positions, page, pageSize);

    return paginatedPositions;
  }

  async findById(positionId: string): Promise<Position | null> {
    const position = await this.positionRepository.findById(positionId);

    if (!position) {
      throw new AppError('Position not found', NOT_FOUND);
    }

    return position;
  }

  async createPosition(positionData: CreatePositionDTO): Promise<Position> {
    const positionDto = new CreatePositionDTO(positionData.name, positionData.regionOperationId);

    const createdPosition = await this.positionRepository.insert(positionDto);

    return createdPosition;
  }

  async updatePosition(positionId: string, positionData: UpdatePositionDTO): Promise<Position> {
    const position = await this.positionRepository.findById(positionId);

    if (!position) {
      throw new AppError('Position not found', NOT_FOUND);
    }

    const positionDto = new UpdatePositionDTO(positionId, positionData.name, positionData.regionOperationId);

    const updatedPosition = await this.positionRepository.update(positionDto);

    return updatedPosition;
  }

  async delete(positionId: string): Promise<void> {
    const position = await this.positionRepository.findById(positionId);

    if (!position) {
      throw new AppError('Position not found', NOT_FOUND);
    }

    await this.positionRepository.delete(positionId);
  }
}
