import { Log } from '@domain/entities/Log';

export interface LogRepository {
  insert(entity: Log): Promise<Log | null>;

  findAll(): Promise<Log[]>;
}
