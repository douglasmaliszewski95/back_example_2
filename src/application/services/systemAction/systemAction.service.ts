import { CreateSystemActionDTO } from '@domain/dto/systemAction/create-systemAction-dto';
import { AbstractSystemActionService } from './abstract-systemAction.service';
import { SystemAction } from '@domain/entities/SystemAction';
import { SystemActionRepository } from '@domain/repositories/systemAction-repository';
import { UpdateSystemActionDTO } from '@domain/dto/systemAction/update-systemAction-dto';
import AppError from '@domain/exceptions/AppError';
import { NOT_FOUND } from 'http-status';
import { PaginatedData, paginator } from '@application/utils/pagination';

export class SystemActionService implements AbstractSystemActionService {
  constructor(private systemActionRepository: SystemActionRepository) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<SystemAction>> {
    const systemActions = await this.systemActionRepository.findAll();

    const paginatedSystemActions = paginator(systemActions, page, pageSize);

    return paginatedSystemActions;
  }

  async listById(systemActionId: string): Promise<SystemAction | null> {
    const systemAction = await this.systemActionRepository.findById(systemActionId);

    return systemAction;
  }

  async createSystemAction(systemActionData: CreateSystemActionDTO): Promise<SystemAction> {
    const systemActionDto = new CreateSystemActionDTO(systemActionData.name);

    const systemAction = await this.systemActionRepository.insert(systemActionDto);

    return systemAction;
  }

  async updateSystemAction(systemActionId: string, systemActionData: UpdateSystemActionDTO): Promise<SystemAction> {
    const systemAction = await this.systemActionRepository.findById(systemActionId);

    if (!systemAction) {
      throw new AppError('SystemAction not found', NOT_FOUND);
    }

    const systemActionDto = new UpdateSystemActionDTO(systemActionId, systemActionData.name);

    const systemActionUpdated = await this.systemActionRepository.update(systemActionDto);

    return systemActionUpdated;
  }

  async delete(systemActionId: string): Promise<void> {
    const systemAction = await this.systemActionRepository.findById(systemActionId);

    if (!systemAction) {
      throw new AppError('SystemAction not found', NOT_FOUND);
    }

    await this.systemActionRepository.delete(systemActionId);
  }
}
