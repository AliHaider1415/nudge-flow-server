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
    ) {}

    create (createTaskDto: CreateTaskDto, user: User) {
        const task = this.taskRepository.create({
            ...createTaskDto,
            user
        })
        this.taskRepository.save(task)
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

    async update (id: number, updateTaskDto: UpdateTaskDto) {
        await this.taskRepository.update(id, updateTaskDto)
    }

    remove (id: number) {
        this.taskRepository.delete(id)
    }
}
