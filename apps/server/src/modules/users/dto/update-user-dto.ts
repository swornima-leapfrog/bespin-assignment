import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsOptional()
  imageUrl?: string;
}
