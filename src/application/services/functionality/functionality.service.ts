import { UpdateFunctionalityDTO } from '@domain/dto/functionality/update-functionality-dto';
import { AbstractFunctionalityService } from './abstract-functionality.service';
import { Functionality } from '@domain/entities/Functionality';
import AppError from '@domain/exceptions/AppError';
import { FunctionalityRepository } from '@domain/repositories/functionality-repository';
import { NOT_FOUND } from 'http-status';
import { CreateFunctionalityDTO } from '@domain/dto/functionality/create-functionality-dto';

export class FunctionalityService implements AbstractFunctionalityService {
  constructor(private functionalityRepository: FunctionalityRepository) {}

  async list(): Promise<Functionality[]> {
    const functionalities = this.functionalityRepository.findAll();

    return functionalities;
  }

  async findById(functionalityId: string): Promise<Functionality | null> {
    const functionality = await this.functionalityRepository.findById(functionalityId);

    if (!functionality) {
      throw new AppError('Functionality not found', NOT_FOUND);
    }

    return functionality;
  }

  async createFunctionality(functionalityData: CreateFunctionalityDTO): Promise<Functionality> {
    const functionalityDto = new CreateFunctionalityDTO(functionalityData.name, functionalityData.system);

    const createdFunctionality = await this.functionalityRepository.insert(functionalityDto);

    return createdFunctionality;
  }

  async updateFunctionality(
    functionalityId: string,
    functionalityData: UpdateFunctionalityDTO,
  ): Promise<Functionality> {
    const functionality = await this.functionalityRepository.findById(functionalityId);

    if (!functionality) {
      throw new AppError('Functionality not found', NOT_FOUND);
    }

    const functionalityDto = new UpdateFunctionalityDTO(
      functionalityId,
      functionalityData.name,
      functionalityData.system,
    );

    const updatedFunctionality = await this.functionalityRepository.update(functionalityDto);

    return updatedFunctionality;
  }

  async delete(functionalityId: string): Promise<void> {
    const functionality = await this.functionalityRepository.findById(functionalityId);

    if (!functionality) {
      throw new AppError('Functionality not found', NOT_FOUND);
    }

    await this.functionalityRepository.delete(functionalityId);
  }
}
