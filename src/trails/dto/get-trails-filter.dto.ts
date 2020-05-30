import { IsOptional } from "class-validator";

export class getTrailsFilterDto {
  @IsOptional()
  search: string;
}
