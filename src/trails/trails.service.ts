import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { getTrailsFilterDto } from './dto/get-trails-filter.dto';
import { TrailRepository } from './trail.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(TrailRepository)
    private trailRepository: TrailRepository
  ) {}

  async getAllTrails(filterDto: getTrailsFilterDto): Promise<Trail[]> {
    return await this.trailRepository.getTrails(filterDto);
  }

  async getTrailById(id: number): Promise<Trail> {
    const found = await this.trailRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Trail with ID "${id}" not found`);
    }

    return found;
  }

  async createTrail(
    createTrailDto: CreateTrailDto,
    user: User
  ): Promise<Trail> {
    return await this.trailRepository.createTrail(createTrailDto, user)
  }

  async deleteTrail(id: number): Promise<void> {
    const result = await this.trailRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Trail with ID "${id}" not found`);
    }
  }

  async updateTrail(id: number, updateTrailDto: UpdateTrailDto)  {
    const found = await this.getTrailById(id);

    found.date = updateTrailDto.date;
    found.headline = updateTrailDto.headline;
    found.pretext = updateTrailDto.pretext;
    await found.save();

    return found;
  }
}
