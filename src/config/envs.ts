import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars{
    PORT: number;
    PRODUCTS_MICROSERVICES_HOST :string;
    PRODUCTS_MICROSERVICES_PORT : number;
    /* DATABASE_URL: String; */
    ORDER_MICROSERVICES_HOST:string;
    ORDER_MICROSERVICES_PORT:number;
}

/* Validador de esquema */
const envsSchema = joi.object({
    PORT: joi.number().required(),
    /* DATABASE_URL: joi.string().required(), */
    PRODUCTS_MICROSERVICES_HOST :joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT : joi.number().required(),

    ORDER_MICROSERVICES_HOST: joi.string().required(),
    ORDER_MICROSERVICES_PORT: joi.number().required(),
})
.unknown(true);

/* destructuramos */
const {error, value} = envsSchema.validate( process.env );

if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;
console.log(envsVars.PORT);

export const envs={
    port: envsVars.PORT,
    /* databaseUrl: envsVars.DATABASE_URL, */
    productsMicroservicesHost:envsVars.PRODUCTS_MICROSERVICES_HOST,
    productsMicroservicesPort:envsVars.PRODUCTS_MICROSERVICES_PORT,

    orderMicroservicesHost:envsVars.ORDER_MICROSERVICES_HOST,
    orderMicroservicesPort:envsVars.ORDER_MICROSERVICES_PORT
};