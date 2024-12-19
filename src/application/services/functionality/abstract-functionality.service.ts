import { CreateFunctionalityDTO } from '@domain/dto/functionality/create-functionality-dto';
import { UpdateFunctionalityDTO } from '@domain/dto/functionality/update-functionality-dto';
import { Functionality } from '@domain/entities/Functionality';

export abstract class AbstractFunctionalityService {
  abstract list(): Promise<Functionality[]>;
  abstract findById(functionalityId: string): Promise<Functionality | null>;
  abstract delete(functionalityId: string): Promise<void>;
  abstract createFunctionality(functionalityData: CreateFunctionalityDTO): Promise<Functionality>;
  abstract updateFunctionality(
    functionalityId: string,
    functionalityData: UpdateFunctionalityDTO,
  ): Promise<Functionality>;
}
