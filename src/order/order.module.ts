import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  controllers: [OrderController],
  providers:[],
  imports: [
    ClientsModule.register([
        /* esto es un arreglo ya que aqui irian los modulos de los microservicio a conectar */
          { name: ORDER_SERVICE, 
            transport: Transport.TCP,
            options:{
              host: envs.orderMicroservicesHost,
              port: envs.orderMicroservicesPort
            }
          },
        ]),
  ]
})
export class OrderModule {}
