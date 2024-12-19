import { CreateFunctionalityDTO } from '@domain/dto/functionality/create-functionality-dto';
import { UpdateFunctionalityDTO } from '@domain/dto/functionality/update-functionality-dto';
import { Functionality } from '@domain/entities/Functionality';

export interface FunctionalityRepository {
  findAll(): Promise<Functionality[]>;

  findById(id: string): Promise<Functionality | null>;

  insert(entity: CreateFunctionalityDTO): Promise<Functionality>;

  update(entity: UpdateFunctionalityDTO): Promise<Functionality>;

  delete(id: string): Promise<void>;
}
