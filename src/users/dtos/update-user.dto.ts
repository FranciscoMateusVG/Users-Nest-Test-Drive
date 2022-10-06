import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'This is optional property',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is optional property',
  })
  @IsString()
  @IsOptional()
  password: string;
}
