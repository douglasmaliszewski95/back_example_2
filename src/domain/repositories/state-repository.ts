import { CreateStateDTO } from '@domain/dto/state/create-state-dto';
import { UpdateStateDTO } from '@domain/dto/state/update-state-dto';
import { State } from '@domain/entities/State';

export interface StateRepository {
  findAll(): Promise<State[]>;

  findById(stateId: number): Promise<State | null>;

  insert(dto: CreateStateDTO): Promise<State>;

  update(dto: UpdateStateDTO): Promise<State>;

  delete(id: number): Promise<void>;
}
