import { IsString, Length } from 'class-validator';


export class CodeDTO {
  @IsString()
  @Length(6, 6)
  code: string;
}