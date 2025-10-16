import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateCategoryDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}