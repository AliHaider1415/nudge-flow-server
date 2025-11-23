import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredAppService } from './monitored-app.service';

describe('MonitoredAppService', () => {
  let service: MonitoredAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoredAppService],
    }).compile();

    service = module.get<MonitoredAppService>(MonitoredAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
