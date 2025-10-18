import { IsString, IsOptional, IsBoolean, IsEnum, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High'])
  priority?: 'Low' | 'Medium' | 'High';
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
