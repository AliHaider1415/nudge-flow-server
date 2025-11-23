import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredAppController } from './monitored-app.controller';
import { MonitoredAppService } from './monitored-app.service';

describe('MonitoredAppController', () => {
  let controller: MonitoredAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoredAppController],
      providers: [MonitoredAppService],
    }).compile();

    controller = module.get<MonitoredAppController>(MonitoredAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
