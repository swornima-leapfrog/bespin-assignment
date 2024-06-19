import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  content?: string;
}
