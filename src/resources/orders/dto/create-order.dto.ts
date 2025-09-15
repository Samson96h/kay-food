import { IsInt, IsArray, ValidateNested, Min, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsInt()
  productId: number;

  @IsArray()
  @IsInt({ each: true })
  ingredientIds?: number[];

  @IsInt()
  @Min(1)
  quantity: number;
}

export class OrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsBoolean()
  delivery?: boolean;

  @IsNumber()
  x?: number;

  @IsNumber()
  y?: number;
}
