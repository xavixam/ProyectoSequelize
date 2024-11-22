const { Product, Category, Sequelize, Cat_Prod } = require("../models/index");
const {Op} = Sequelize

const ProductController = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            product.addCategory(req.body.CategoryId) //inserto en la tabla intermedia genreBooks
            res.status(201).send({ message: "Product created", product });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getAll(req, res) {
        try {
            const products = await Product.findAll({
                include:{
                    model:Category,//modelo que esta relacionado
                    attributes: ["name"],//atributos del modelo que quiero mostrar
                    through: { attributes: [] }//para que no se muestren los atributos de la tabla intermedia
                }
            } 
        );
            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getOrdered(req, res) {
        try {
            const products = await Product.findAll({
                order: [
                    ["price", "DESC"],
                ]
            });
            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async delete(req, res) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            })
            await Cat_Prod.destroy({
                where: {
                    CategoryId: req.params.id
                }
            })
            res.send({ message: `Product with id ${req.params.id} deleted` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async update(req, res) {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.send({ message: "Product successfully updated" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
        }
    },
    async getById(req, res) {
        try {
            const products = await Product.findByPk(req.params.id);
            res.status(200).send(products)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    },
    async getByName(req, res) {
        try {
            const products = await Product.findOne({
                where: {
                    name: req.params.name,
                },
            });
            res.status(200).send(products)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "ERROR", error })
        }
    }
};

module.exports = ProductController;