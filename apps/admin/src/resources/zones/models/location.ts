import { IsNumber } from "class-validator";

export class Point {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}