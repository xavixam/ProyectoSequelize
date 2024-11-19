const { User } = require("../models/index")//importar modelo

const UserController = {
    async create(req, res) {
        try {
            const user = await User.create(req.body)
            res.status(201).send({ message: "User created", user })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.findAll({
                // // include:[Post]
                // include:{
                //     model:Post,
                //     attributes:["title","content"]
                // }

            })
            res.status(200).send(users)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    }

};

module.exports = UserController;