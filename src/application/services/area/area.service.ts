import { UpdateAreaDTO } from '@domain/dto/area/update-area-dto';
import { AbstractAreaService } from './abstract-area.service';
import { Area } from '@domain/entities/Area';
import AppError from '@domain/exceptions/AppError';
import { AreaRepository } from '@domain/repositories/area-repository';
import { NOT_FOUND } from 'http-status';
import { CreateAreaDTO } from '@domain/dto/area/create-area-dto';
import { PaginatedData, paginator } from '@application/utils/pagination';

export class AreaService implements AbstractAreaService {
  constructor(private areaRepository: AreaRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<Area>> {
    const areas = await this.areaRepository.findAll();

    const paginatedAreas = paginator(areas, page, pageSize);

    return paginatedAreas;
  }

  async findById(areaId: string): Promise<Area | null> {
    const area = await this.areaRepository.findById(areaId);

    if (!area) {
      throw new AppError('Area not found', NOT_FOUND);
    }

    return area;
  }

  async createArea(areaData: CreateAreaDTO): Promise<Area> {
    const areaDto = new CreateAreaDTO(areaData.name, areaData.regionOperationId);

    const createdArea = await this.areaRepository.insert(areaDto);

    return createdArea;
  }

  async updateArea(areaId: string, areaData: UpdateAreaDTO): Promise<Area> {
    const area = await this.areaRepository.findById(areaId);

    if (!area) {
      throw new AppError('Area not found', NOT_FOUND);
    }

    const areaDto = new UpdateAreaDTO(areaId, areaData.name, areaData.regionOperationId);

    const updatedArea = await this.areaRepository.update(areaDto);

    return updatedArea;
  }

  async delete(areaId: string): Promise<void> {
    const area = await this.areaRepository.findById(areaId);

    if (!area) {
      throw new AppError('Area not found', NOT_FOUND);
    }

    await this.areaRepository.delete(areaId);
  }
}
