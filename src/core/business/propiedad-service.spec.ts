import { Test, TestingModule } from '@nestjs/testing';
import { PropiedadService } from './propiedad-service';

describe('PropiedadService', () => {
  let provider: PropiedadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropiedadService],
    }).compile();

    provider = module.get<PropiedadService>(PropiedadService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
