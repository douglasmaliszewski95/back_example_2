import { randomUUID } from 'crypto';

export type ValidationsProps = {
  validationsId?: string;
  name: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export class Validations {
  validationsId?: string;
  name!: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  constructor(props: ValidationsProps) {
    Object.assign(this, props);
    this.validationsId = props.validationsId || randomUUID();
  }
}
