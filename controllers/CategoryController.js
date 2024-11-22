const { Category, Product, Cat_Prod } = require("../models/index"); //importar modelo

const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            category.addProduct(req.body.ProductId) //inserto en la tabla intermedia genreBooks
            res.status(201).send({ message: "Category created", category });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getAll(req, res) {
        try {
            const categories = await Category.findAll({
                include: {
                  model: Product,
                  attributes: ["name", "price"],
                  through: { attributes: [] }
                },
              });
            res.status(200).send(categories);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async delete(req, res) {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id,
                },
            })
            await Cat_Prod.destroy({
                where: {
                    ProductId: req.params.id
                }
            })
            res.send({ message: `Category with id ${req.params.id} deleted` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async update(req, res) {
        try {
            await Category.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.send({ message: "Category successfully updated" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getById(req, res) {
        try {
            const categories = await Category.findByPk(req.params.id);
            res.status(200).send(categories)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    },
    async getByName(req, res) {
        try {
            const categories = await Category.findOne({
                where: {
                    name: req.params.name,
                },
            });
            res.status(200).send(categories)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    }
};

module.exports = CategoryController;