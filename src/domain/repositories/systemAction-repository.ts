import { SystemAction } from '@domain/entities/SystemAction';

export interface SystemActionRepository {
  insert(entity: SystemAction): Promise<SystemAction>;

  findById(id: string): Promise<SystemAction | null>;

  findAll(): Promise<SystemAction[]>;

  findByName(name: string): Promise<SystemAction | null>;

  update(entity: SystemAction): Promise<SystemAction>;

  delete(id: string): Promise<void>;
}
