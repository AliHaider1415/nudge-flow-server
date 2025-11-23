import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        
        private readonly taskRepository: Repository<Task>,
        // private readonly userRepository: Repository<User>,
    ) {}

    create(dto: CreateTaskDto, userId: number) {

        const task = this.taskRepository.create({
            ...dto,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
            user: { id: userId } as any
        });

        this.taskRepository.save(task);

        return {
            message: "Task created successfully",
        };
    }


    async findAllByUser(userId: number) : Promise<Task[]> {
        const tasks = await this.taskRepository.find({
            where: {user: { id: userId}},
            order: { dueDate: 'ASC' },
        })

        if (!tasks.length) {
        throw new NotFoundException(`No tasks found for user with ID ${userId}`);
        }

        return tasks;
    }

    async update(id: number, dto: UpdateTaskDto) {
        const updateData: any = {
            ...dto,
        };

        if (dto.dueDate) {
            updateData.dueDate = new Date(dto.dueDate);
        }

        return await this.taskRepository.update(id, updateData);
    }


    remove (id: number) {
        this.taskRepository.delete(id)
    }
}
