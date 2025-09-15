import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Point } from '../models/location';
import { Type } from 'class-transformer';


export class CreateZoneDTO {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Point)
  perimeter: Point[];
}
