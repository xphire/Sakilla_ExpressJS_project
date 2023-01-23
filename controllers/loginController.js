require('dotenv').config();


const jwt = require('jsonwebtoken');

const {StatusCodes} = require('http-status-codes');

const lambadia = require('../users/users.json');




const login = async (req,res) => {

  const user = req.body.username;
  const access = req.body.password;
  if (!user || !access) {return res.status(StatusCodes.BAD_REQUEST).json({message: `username and password required`})};
  if((lambadia.filter((el)=>el.userName ===user && el.password === access)).length < 1){return res.status(StatusCodes.BAD_REQUEST).json({message: `user with supplied details does not exist`})};
  const token = jwt.sign({user,access},process.env.JWT_SECRET,{expiresIn : '30d'})

 return res.status(StatusCodes.OK).json({message:`user successfully authenticated`,userData:req.body,token:token})
};



module.exports = {login}
