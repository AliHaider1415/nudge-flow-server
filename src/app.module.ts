import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { MonitoredAppModule } from './monitored-app/monitored-app.module';
import { MonitoredApp } from './monitored-app/entities/monitored-app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nudge-flow-db',
      entities: [User, Task, MonitoredApp],
      synchronize: true,
    }),
    TasksModule, AuthModule, UsersModule, TasksModule, MonitoredAppModule],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
