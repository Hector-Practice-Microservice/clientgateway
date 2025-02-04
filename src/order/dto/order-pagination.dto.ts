import { IsEnum, IsOptional } from "class-validator";
import { Pagination } from "src/common/dto/pagination.dto";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class OrderPaginationDto extends Pagination{

    @IsOptional()
    @IsEnum(OrderStatusList,{
        message:`Valid status are ${ OrderStatusList }`
    })
    status: OrderStatus
}