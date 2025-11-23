import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitoredApp } from './entities/monitored-app.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMonitoredAppDto } from './dto/create-monitored-app.dto';

@Injectable()
export class MonitoredAppService {
    constructor(
    @InjectRepository(MonitoredApp)
    private monitoredAppRepo: Repository<MonitoredApp>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
    ) {}

    async create(userId: string, dto: CreateMonitoredAppDto) {
        const user = await this.userRepo.findOne({ where: { id: Number(userId) } });

        if (!user) {
            throw new Error('User not found');
        }

        const app = this.monitoredAppRepo.create({
        ...dto,
        user,
        });

        return this.monitoredAppRepo.save(app);
    }

    async findByUser(userId: string) {
        return this.monitoredAppRepo.find({
            where: { user: { id: Number(userId) } },
        });
    }

}
