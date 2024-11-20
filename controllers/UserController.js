const { User, Order } = require("../models/index")//importar modelo
const bcrypt = require ('bcryptjs');

const UserController = {
    async create(req, res) {
        try {
          // console.log(req.body)
          req.body.password = await bcrypt.hash(req.body.password, 10);
          const user = await User.create(req.body);
          res.status(201).send({ message: "Usuario creado", user });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.findAll({
                include:[Order]
            })
            res.status(200).send(users)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    },
    async login(req, res) {

      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(400).send({ message: "Incorrect email or password" });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
          return res.status(400).send({message: "Incorrect email or password"})
      }

      res.send({message:"Successfully logged",user})

    },
};

module.exports = UserController;