import { PaginatedData } from '@application/utils/pagination';
import { CreateSystemActionDTO } from '@domain/dto/systemAction/create-systemAction-dto';
import { UpdateSystemActionDTO } from '@domain/dto/systemAction/update-systemAction-dto';
import { SystemAction } from '@domain/entities/SystemAction';

export abstract class AbstractSystemActionService {
  abstract list(page: number, pageSize: number): Promise<PaginatedData<SystemAction>>;
  abstract listById(systemActionId: string): Promise<SystemAction | null>;
  abstract createSystemAction(systemActionData: CreateSystemActionDTO): Promise<SystemAction>;
  abstract updateSystemAction(systemActionId: string, systemActionData: UpdateSystemActionDTO): Promise<SystemAction>;
  abstract delete(systemActionId: string): Promise<void>;
}
