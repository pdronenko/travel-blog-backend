import { Test } from '@nestjs/testing';
import { TrailsService } from './trails.service';
import { TrailRepository } from './trail.repository';
import { getTrailsFilterDto } from './dto/get-trails-filter.dto';

const mockUser = { username: 'Bruno' };

const mockTrailRepository = () => ({
  getTrails: jest.fn(),
});

describe('TrailService', () => {
  let trailService: TrailsService;
  let trailRepository: TrailRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TrailsService,
        { provide: TrailRepository, useFactory: mockTrailRepository }
      ]
    }).compile();

    trailService = module.get<TrailsService>(TrailsService);
    trailRepository = module.get<TrailRepository>(TrailRepository);
  })

  describe('getTrails', () => {
    it('gets all trails from the repository', () => {
      expect(trailRepository.getTrails).not.toHaveBeenCalled();
      const filters: getTrailsFilterDto = { search: 'Some seach query' };
      trailService.getAllTrails(filters);
      expect(trailRepository.getTrails).toHaveBeenCalled();
    })
  })
})
