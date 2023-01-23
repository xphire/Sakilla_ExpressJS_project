const express = require('express');

const router = express.Router();


const {getAllActors,getActor,createActor,deleteActor, updateActor} = require('../controllers/actorsController');


router.route('/').get(getAllActors).post(createActor);
router.route('/:id').get(getActor).delete(deleteActor).put(updateActor);
//router.route('/').post(createActor);

module.exports = router