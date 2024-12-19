/* eslint-disable @typescript-eslint/no-unused-vars */
import { State } from '@domain/entities/State';
import { StateRepository } from '../../domain/repositories/state-repository';
import { PrismaClient } from '@prisma/client';
import { StateModelMapper } from '../../domain/dto/state/state-model-mapper';

export class StatePrismaRepository implements StateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<State[]> {
    try {
      const models = await this.prisma.states.findMany();
      return models.map((model) => StateModelMapper.toEntity(model));
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async findById(stateId: number): Promise<State | null> {
    try {
      const model = await this.prisma.states.findUnique({
        where: {
          stateId: stateId,
        },
      });
      if (model) return StateModelMapper.toEntity(model);

      return model;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async insert(entity: State): Promise<State> {
    try {
      const createdState = await this.prisma.states.create({
        data: {
          countryId: entity.countryId,
          name: entity.name,
          stateIsoCode: entity.stateIsoCode,
          createdAt: new Date(),
        },
      });

      return createdState;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(state: State): Promise<State> {
    try {
      const stateData = {
        countryId: state.countryId,
        name: state.name,
        stateIsoCode: state.stateIsoCode,
        updatedAt: new Date(),
      };

      const updatedStateModel = await this.prisma.states.update({
        where: {
          stateId: state.stateId,
        },
        data: {
          ...stateData,
        },
      });

      if (updatedStateModel) return StateModelMapper.toEntity(updatedStateModel);

      return updatedStateModel;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.states.update({
        where: {
          stateId: id,
        },
        data: {
          // excluded: true,
          updatedAt: new Date(),
        },
      });
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
