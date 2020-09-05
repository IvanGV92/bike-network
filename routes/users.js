var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');

router.get('/',usersController.list);
router.get('/create', usersController.create_get);
router.post('/create',usersController.create);
router.get('/:id/update',usersController.update_get);
router.post('/:id/update',usersController.update);
router.post('/:id/delete',usersController.delete);


module.exports = router;
