import { IsNotEmpty } from 'class-validator';

export class CreateTrailDto {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  headline: string;

  @IsNotEmpty()
  pretext: string;
}
