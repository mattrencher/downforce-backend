const model = require('../models/User');
const response = require("../responses/APIResponse");
const helper = require("../helpers/Helper");

class UserController {
    
    /**
     * Create a new user
     * @param req
     * @param res
     * @returns Express.response
     */
    async create(req, res) {
        const params = req.body;
        console.log(params);
        let new_user = {
            "username": params.username,
            "password": await helper.generate_password(req.body.password),
            "email": params.email
        }

        model.create(new_user)
        .then((createdUser) => {
            res.status(200).send(response.successWithData([createdUser]));
        })
        .catch(function (err) {
            res.status(500).send(response.error(err, 'Error while creating user'));
        });

    }

    /**
     * Return specific user by id
     * @param req
     * @param res
     * @returns Express.response
     */
    async get(req, res) {
        // Get record from database
        console.log(req.params.id);
        model.get(req.params.id).then(function (result) {
            // Check if record exists
            if (result) {
                res.status(200).send(response.successWithData([result]));
            } else {
                // Check if record is not found then send an empty data
                res.status(200).send(response.successWithData([]));
            }
        }).catch(function (error) {
            res.status(500).send(response.error(error, req.app.get('is_debug')));
        });
    }

    /**
     * Return specific user by id
     * @param req
     * @param res
     * @returns Express.response
     */
    async update(req, res) {
        const params = req.body;

        let update_user = {
            "updated_at": new Date().toISOString(),
        }

        params.username && (update_user.username = params.username);
        params.password && (update_user.password = await helper.generate_password(req.body.password));
        params.email && (update_user.email = params.email);

        model.update(req.params.id, update_user)
            .then((updatedUser) => {
                res.status(200).send(response.successWithData([updatedUser]))
            })
            .catch(function (error) {
                res.status(500).send(response.error(error, req.app.get('is_debug')));
            });
    }

    /**
     *
     * @param req
     * @param res
     * @returns Express.response
     */
    async list(req, res) {
        // Get records from database
        model.listWithPagination(req.app.get('page'), req.app.get('per_page'), req.app.get('list_all')).then(function (result) {
            // Check if record exists
            if (result) {
                res.status(200).send(response.successWithPagination(result, req.app.get('page'), req.app.get('per_page')));
            } else {
                // Check if record is not found then send an empty data
                res.status(200).send(response.successWithData());
            }
        }).catch(function (error) {
            res.status(500).send(response.error(error, req.app.get('is_debug')));
        });

    }
}

module.exports = UserController