const { validationResult } = require('express-validator');
// ******** Sequelize ***********
const {
  Product,
  Item,
} = require('../database/models');

module.exports = {
    addToCart(req, res) {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
          
          Product.findByPk(req.body.productId, {
            include: ['user'],
          })
            .then((product) => {
              let price =
                Number(product.discount) > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;
              return Item.create({
                salePrice: price,
                quantity: req.body.quantity,
                subTotal: price * req.body.quantity,
                state: 1,
                userId: req.body.userId,
                sellerId: product.user.id,
                productId: product.id,
              });
            })
            .then((item) => {
                let respuesta = {
                    meta : {
                        status : 201,
                        message: "El producto ha sido agregado al carrito con éxito!",
                    },
                    data : item
                }
                return res.json(respuesta)
            })
            .catch((e) => {
                console.log(e)
                let respuesta = {
                    meta : {
                        status : 500,
                        message: "El producto NO se pudo agregar al carrito",
                    },
                    data: {error: e}
                }
                return res.json
            });
        } else {
           Product.findByPk(req.body.productId, {
             include: ['user'],
           })
             .then(product => {
                let respuesta = {
                    meta : {
                        status : 203,
                        url: '/items',
                        message: "Error: El producto NO se pudo agregar al carrito"
                    },
                    data : {product: product, errors: errors.mapped()}
                }
                return res.json(respuesta)
             })     
        }
      },
}