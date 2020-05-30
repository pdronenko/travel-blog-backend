import { Repository, EntityRepository } from "typeorm";
import { Trail } from './trail.entity';
import { CreateTrailDto } from "./dto/create-trail.dto";
import { getTrailsFilterDto } from './dto/get-trails-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Trail)
export class TrailRepository extends Repository<Trail> {
  private logger = new Logger('TrailRepository');

  async getTrails(filterDto: getTrailsFilterDto): Promise<Trail[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('trail');

    if (search) {
      query.andWhere('(task.headline LIKE :search OR task.pretext LIKE :search)', { search: `%${search}%` })
    }

    try {
      const trails = await query.getMany();
      return trails;
    } catch (error) {
      this.logger.error(`Failed to get trails, filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTrail(
    createTrailDto: CreateTrailDto,
    user: User
  ): Promise<Trail> {
    // TODO simplify code
    const trail = new Trail();
    trail.headline = createTrailDto.headline;
    trail.date = createTrailDto.date;
    trail.pretext = createTrailDto.pretext;
    trail.user = user;

    try {
      await trail.save();
    } catch (error) {
      this.logger.error(`Failed to create trail, user: ${user.username}, data: ${createTrailDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    delete trail.user;

    return trail;
  }
}
