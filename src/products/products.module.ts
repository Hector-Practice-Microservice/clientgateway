import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports:[
    ClientsModule.register([
    /* esto es un arreglo ya que aqui irian los modulos de los microservicio a conectar */
      { name: PRODUCT_SERVICE, 
        transport: Transport.TCP,
        options:{
          host: envs.productsMicroservicesHost,
          port: envs.productsMicroservicesPort
        }
       },
    ]),
  ]
})
export class ProductsModule {}
