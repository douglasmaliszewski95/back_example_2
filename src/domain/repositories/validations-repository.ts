import { Validations } from '@domain/entities/Validations';

export interface ValidationsRepository {
  findAll(): Promise<Validations[]>;
}
