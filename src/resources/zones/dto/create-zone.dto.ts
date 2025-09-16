import { IsString, IsArray, ValidateNested } from 'class-validator';

import { Point } from '../models/location';


export class CreateZoneDTO {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  perimeter: Point[];
}
