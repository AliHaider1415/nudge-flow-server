import { MonitoredApp } from 'src/monitored-app/entities/monitored-app.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @OneToMany(() => MonitoredApp, (ma) => ma.user)
  monitoredApps: MonitoredApp[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
