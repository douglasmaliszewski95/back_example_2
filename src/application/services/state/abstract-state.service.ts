import { PaginatedData } from '@application/utils/pagination';
import { CreateStateDTO } from '@domain/dto/state/create-state-dto';
import { UpdateStateDTO } from '@domain/dto/state/update-state-dto';
import { State } from '@domain/entities/State';

export abstract class AbstractStateService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<State>>;
  abstract listById(stateId: number): Promise<State | null>;
  abstract createState(ruleData: CreateStateDTO): Promise<State>;
  abstract updateState(stateId: number, stateData: UpdateStateDTO): Promise<State>;
  abstract delete(stateId: number): Promise<void>;
}
