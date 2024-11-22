const { User, Order, Token, Product } = require("../models/index")//importar modelo
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']

const UserController = {
    async create(req, res, next) {
        try {
          // console.log(req.body)
          req.body.password = await bcrypt.hash(req.body.password, 10);
          const user = await User.create(req.body);
          res.status(201).send({ message: "Usuario creado", user });
        } catch (error) {
          console.error(error);
          next(error)
          res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getAll(req, res, next) {
        try {
            const users = await User.findAll({
                include:[Order]
            })
            res.status(200).send(users)
        } catch (error) {
            console.error(error);
            next(error)
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

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });

      res.send({message:"Successfully logged",user})

    },
    async logout(req, res, next) {
      try {
          await Token.destroy({
              where: {
                  [Op.and]: [
                      { UserId: req.user.id },
                      { token: req.headers.authorization }
                  ]
              }
          });
          res.send({ message: 'Desconected successfully' })
      } catch (error) {
          console.log(error)
          next(error)
          res.status(500).send({ message: 'ERROR trying to connect' })
      }
    },
    async getUserInfo(req, res, next) {
      try {
          const products = await User.findByPk(req.user.id, {
            include: {
              model: Order,
              include: {
                model: Product,//modelo que esta relacionado
                attributes: ["name"],//atributos del modelo que quiero mostrar
                through: { attributes: [] }//para que no se muestren los atributos de la tabla intermedia
              },
            }
          });
          res.status(200).send(products)
      } catch (error) {
          console.error(error);
          next(error)
          res.status(500).send({ message: "ERROR", error })
      }
  },
};

module.exports = UserController;