import { IsString, IsBoolean } from 'class-validator';

export class CreateMonitoredAppDto {
  @IsString()
  label: string;

  @IsString()
  packageName: string;

  @IsBoolean()
  isActive?: boolean = true;
}
