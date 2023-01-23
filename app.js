require('dotenv').config();

const{StatusCodes} = require('http-status-codes');


const express = require('express');
const app = express();

const {postgresConnection} = require('./database/database');

const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./swagger_output.json');

const router = require('./routers/actors');

const loginRouter = require('./routers/login')

const authenticateUser = require('./middle-ware/authWare');

const port = 3000;

//middleware
app.use(express.json());


//Start Testing Request
app.get('/',(req,res) => {
    res.status(StatusCodes.OK).json({message: `Testing Testing Tested`});
})


//extra middlewares
app.use('/api/v1/actors',authenticateUser,router)
app.use('/api/v1/auth',loginRouter)
app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerFile))

//App initiation after database connection
const start = async () => {
     
    try{
        await postgresConnection()
        app.listen(port, console.log(`Server is listening on  port ${port}...`))
    } catch (error){
        console.log(error)
    }
};

start()








