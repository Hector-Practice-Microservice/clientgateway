import { Type } from "class-transformer";
import { IsOptional, IsPositive, isPositive } from "class-validator";

export class Pagination{
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10
}