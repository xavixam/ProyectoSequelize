const { Order, Product } = require("../models/index"); //importar modelo

const OrderController = {
    async create(req, res) {
        try {
            // console.log(req.body)
            const order = await Order.create(req.body);
            res.status(201).send({ message: "Order created", order });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                // include:[Post]
                include: {
                  model: Product,
                  attributes: ["name", "price"],
                },
              });
            res.status(200).send(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    }
};

module.exports = OrderController;