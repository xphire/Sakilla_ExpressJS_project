const {credentials} = require('../database/database');

const Pool = require('pg').Pool;

const pool = new Pool(credentials);

const {StatusCodes} = require('http-status-codes');

const getAllActors = (req,res) => {
      
      pool.query('SELECT * FROM actor LIMIT 10',(error,results) => {

        if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false ,message : "internal server error"})
        }
        const zara = results.rows;
        return res.status(StatusCodes.OK).json({success: true, data: zara , actorCount: zara.length})}
        )

};



const getActor = (req,res) => {

    const id = parseInt(req.params.id);

     if (isNaN(id)){
         res.status(StatusCodes.BAD_REQUEST).json({success:false, message: `ID must be an integer only`});
    }else{

    pool.query(`SELECT * FROM actor WHERE actor_id = ${id}`,(error,results) => {
      
      if (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: `internal server error`})
        }

      if (results.rows.length < 1){
        res.status(StatusCodes.NOT_FOUND).json({success: false,message: `ID ${id} does not exist`});
      }else{
        res.status(200).json({success:true,data:results.rows})}
    })}

};


const createActor = (req, res) => {

  const {first_name,last_name} = req.body;

  if (!first_name){res.status(StatusCodes.BAD_REQUEST).json({success:false, message: `Actor's first name nust be provided`})};

  if(!last_name){res.status(StatusCodes.BAD_REQUEST).json({success:false, message: `Actor's last name nust be provided`})}else{
    pool.query(`INSERT INTO actor (first_name,last_name) VALUES ($1,$2) RETURNING *`,[first_name,last_name],(error,results) => {
     
      if (error){

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: `internal server error`});
      }else{

        return res.status(StatusCodes.CREATED).json({success: false ,message: `Actor added with actor_id : ${results.rows[0].actor_id}`})
      }
    })
  }

};



const deleteActor = (req, res) => {

  const id = parseInt(req.params.id);

  if (isNaN(id)){return res.status(StatusCodes.BAD_REQUEST).json({message: "Actor ID must be an integer only"})}else{

  pool.query(`SELECT * FROM actor WHERE actor_id = ${id}`,(error,results) => {
      if (error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: `internal server error`});
      };
      if(results.rows.length < 1){
        return res.status(StatusCodes.NOT_FOUND).json({success:false, message: `Actor with ID: ${id} does not exist`})
      }else{

    pool.query(`DELETE FROM actor WHERE actor_id = $1`,[id],(error,results) =>{
      if (error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: `internal server error`})
      }else{
        return res.status(StatusCodes.OK).json({success:true, message: `Actor with ID ${id} deleted`})
      }
    })
    }})}

};



const updateActor = (req,res) => {

  const id = parseInt(req.params.id);
  const {first_name,last_name} = req.body;
  if (isNaN(id)){return res.status(StatusCodes.BAD_REQUEST).json({message: "Actor ID must be an integer only"})};
  if (!first_name || !last_name){return res.status(StatusCodes.BAD_REQUEST).json({message: `Kindly provide the data to be updated `});}else{
    pool.query(`UPDATE actor SET first_name = $1, last_name = $2 WHERE actor_id = $3`,[first_name,last_name,id],(error,results) =>{
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false , message: `internal server error`})
      }else{
        res.status(StatusCodes.OK).json({success: true , message:`Actor Profile with ID ${id} modified`})
      }
    })
  }
};




module.exports = {getAllActors,getActor,createActor,deleteActor,updateActor}