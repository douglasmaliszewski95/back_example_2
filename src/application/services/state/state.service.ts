import { CreateStateDTO } from '@domain/dto/state/create-state-dto';
import { AbstractStateService } from './abstract-state.service';
import { State } from '@domain/entities/State';
import { StateRepository } from '@domain/repositories/state-repository';
import { UpdateStateDTO } from '@domain/dto/state/update-state-dto';
import AppError from '@domain/exceptions/AppError';
import { NOT_FOUND } from 'http-status';
import { PaginatedData, paginator } from '@application/utils/pagination';

export class StateService implements AbstractStateService {
  constructor(private stateRepository: StateRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<State>> {
    const states = await this.stateRepository.findAll();

    const paginatedStates = paginator(states, page, pageSize);

    return paginatedStates;
  }

  async listById(stateId: number): Promise<State | null> {
    const state = await this.stateRepository.findById(stateId);

    return state;
  }

  async createState(stateData: CreateStateDTO): Promise<State> {
    const stateDto = new CreateStateDTO(stateData.countryId, stateData.name, stateData.stateIsoCode);

    const state = await this.stateRepository.insert(stateDto);

    return state;
  }

  async updateState(stateId: number, stateData: UpdateStateDTO): Promise<State> {
    const state = await this.stateRepository.findById(stateId);

    if (!state) {
      throw new AppError('State not found', NOT_FOUND);
    }

    const stateDto = new UpdateStateDTO(stateId, stateData.countryId, stateData.name, stateData.stateIsoCode);

    const stateUpdated = await this.stateRepository.update(stateDto);

    return stateUpdated;
  }

  async delete(stateId: number): Promise<void> {
    const state = await this.stateRepository.findById(stateId);

    if (!state) {
      throw new AppError('Rule not found', NOT_FOUND);
    }

    await this.stateRepository.delete(stateId);
  }
}
