import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { getTrailsFilterDto } from './dto/get-trails-filter.dto';
import { TrailValidationPipe } from './pipes/trail-validation.pipe';
import { Trail } from './trail.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('trails')
export class TrailsController {
  private logger = new Logger('TrailsController');

  constructor(private trailsService: TrailsService) {}

  @Get()
  getTrails(@Query(ValidationPipe) filterDto: getTrailsFilterDto): Promise<Trail[]> {
    this.logger.verbose(`Retrieving all trails, filters: ${JSON.stringify(filterDto)}`)
    return this.trailsService.getAllTrails(filterDto);
  }

  @Get(':id')
  getTrailById(@Param('id', ParseIntPipe) id: number): Promise<Trail> {
    return this.trailsService.getTrailById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createTrail(
    @Body() createTrailDto: CreateTrailDto,
    @GetUser() user: User,
  ): Promise<Trail> {
    return this.trailsService.createTrail(createTrailDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateTrail(
    @Param('id', ParseIntPipe) id: number,
    @Body(TrailValidationPipe) updateTrailDto: UpdateTrailDto
   ): Promise<Trail> {
    return this.trailsService.updateTrail(id, updateTrailDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTrail(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.trailsService.deleteTrail(id);
  }
}
