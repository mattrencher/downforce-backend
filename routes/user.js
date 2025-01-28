var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const UserController = require('../controllers/UserController');
const response = require("../responses/APIResponse");
const controller = new UserController;

/* GET all users. */
router.get('/', function(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(errors.array());
	}

	return controller.list(req, res);
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(errors.array());
	}

	return controller.get(req, res);
});

/* POST create user. */
router.post('/register', async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(errors.array());
	}

	return controller.create(req, res);
});

/* PUT update user. */
router.put('/:id', function(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(errors.array());
	}

	return controller.update(req, res);
});

module.exports = router;
