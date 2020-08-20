let express = require('express');
let router = express.Router();
let bikeController = require('../../controllers/api/bikeController');

router.get('/',bikeController.bike_list);
router.post('/create',bikeController.bike_create);
router.post('/delete',bikeController.bike_delete);
router.post('/update',bikeController.bike_update);





module.exports = router;