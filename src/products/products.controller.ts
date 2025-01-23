import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy 
  ) {}
  /* creamos un post */
  @Post()
  createProduct(@Body() createProductDtos:CreateProductDto){
    return this.productsClient.send({cmd: 'create_product'},createProductDtos);
  }

  @Get()
  findAllProducts(){
    return this.productsClient.send({cmd: 'find_all'}, {limit:30});
  }

  @Get(':id')
  async findOne(@Param('id') id:string){
    /* return this,this.productsClient.send( {cmd: 'find_one_product'}, {id} )
    .pipe(
      catchError(err => {throw new RpcException(err)})
    ) */
    
    try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd: 'find_one_product'}, {id})
      )
      return product;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string){
    return this.productsClient.send({cmd: 'delete_product'},{id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ){
    return this.productsClient.send({cmd: 'update_product'}, 
      {
        id,
        ...updateProductDto}).pipe(
          catchError(err => {throw new RpcException(err)})
        );
  }
}
