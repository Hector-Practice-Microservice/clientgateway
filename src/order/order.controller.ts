import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';
import { Pagination } from 'src/common/dto/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(
      @Inject(ORDER_SERVICE) private readonly orderService: ClientProxy
    ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.send('createOrder',createOrderDto
    );
  }

  @Get()
  findAll( @Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderService.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/ :id')
  async findOne(@Param('id', ParseUUIDPipe) id:string) {
    try {
      const order = await firstValueFrom(
        this.orderService.send('findOneOrder', {id})
        
      )
      return order;

    }catch(e){
      throw new RpcException(e)
    }
  }
  /*  */
  @Get(':status')
  async findStatus(
    @Param() statusDto : StatusDto,
    @Query() pagination: Pagination) {
    try {
      return this.orderService.send("findAllOrders" , {
        ...pagination,
        status: statusDto.status,
      })
    }catch(e){
      throw new RpcException(e)
    }
  }
  /* Recomendable que por cada peticion se tengan DTO diferentes */
  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe)id: string,
    @Body() statusDto: StatusDto,
  ){
    try {
      return this.orderService.send('changeOrderStatus',{id, status: statusDto.status})
    } catch (error) {
      throw new RpcException(error);
    }
  }
/*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
  */
}
