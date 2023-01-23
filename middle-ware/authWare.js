require('dotenv').config();


const dataUser = require('../users/users.json');  


const jwt = require('jsonwebtoken');

const {StatusCodes} = require('http-status-codes');


const authenticateUser = async (req,res,next) => {

    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){return res.status(StatusCodes.UNAUTHORIZED).json({message:`Bearer token missing, authorization failed`})};

    const token = req.headers.authorization.split(' ')[1];

    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if((dataUser.filter((el)=>el.userName === decoded.user  && el.password === decoded.access)).length < 1){return res.status(StatusCodes.UNAUTHORIZED).json({message: `user authorization failed`})};

        next()

    } catch (error) {
        
        res.status(StatusCodes.UNAUTHORIZED).json({message: `Authorization Failed`})
         
    }


};



module.exports = authenticateUser;