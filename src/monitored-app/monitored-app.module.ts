import { Module } from '@nestjs/common';
import { MonitoredAppService } from './monitored-app.service';
import { MonitoredAppController } from './monitored-app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredApp } from './entities/monitored-app.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonitoredApp, User])
  ],
  controllers: [MonitoredAppController],
  providers: [MonitoredAppService],
})
export class MonitoredAppModule {}
