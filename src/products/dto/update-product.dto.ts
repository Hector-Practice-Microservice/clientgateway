import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';
/* PartialType -  convierte las propiedades de CreateProductDto optionals */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
