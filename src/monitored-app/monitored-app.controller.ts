import { Controller, Req, Body, Post, Get } from '@nestjs/common';
import { MonitoredAppService } from './monitored-app.service';
import { CreateMonitoredAppDto } from './dto/create-monitored-app.dto';

@Controller('monitored-app')
export class MonitoredAppController {
  constructor(private readonly monitoredAppService: MonitoredAppService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateMonitoredAppDto) {
    const userId = req.user.id; // from your auth middleware
    return this.monitoredAppService.create(userId, dto);
  }

  @Get()
  findByUser(@Req() req) {
    const userId = req.user.id;
    return this.monitoredAppService.findByUser(userId);
  }
}
