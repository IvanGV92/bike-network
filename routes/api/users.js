let express = require('express');
let router = express.Router();
let userController = require('../../controllers/api/userController');

router.get('/',userController.users_list);
router.post('/create',userController.users_create);
router.post('/reserv',userController.user_reserv);





module.exports = router;