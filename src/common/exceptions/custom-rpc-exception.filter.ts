import { Catch, RpcExceptionFilter, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response  = ctx.getResponse();

    const rpcError = exception.getError();

    if(typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError){
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }
    console.log({rpcError});
    

    response.status(401).json({
      status: 401,
      message: "gate"
    })
  }
}

/* copiado de https://docs.nestjs.com/microservices/exception-filters */