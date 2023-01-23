const swaggerAutogen = require ('swagger-autogen')();

const outputFile = './swagger_output.json';

const endpointsFiles = ['./routers/actors','./routers/login'];

swaggerAutogen(outputFile,endpointsFiles)
