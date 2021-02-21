const { validationResult } = require('express-validator');

// ******** Sequelize ***********

const {
  Product,
  Item,
} = require('../../database/models');

module.exports = {
    addToCart(req, res) {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
          // Search the product
          Product.findByPk(req.body.productId, {
            include: ['user'],
          })
            .then((product) => {
              // Take the value w/discount
              let price =
                Number(product.discount) > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;
              // Creat the item
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
                        message: "Producto agregado con éxito!",
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
                        message: "El producto NO ha sido agregado",
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
                        url: '/api/items',
                        message: "Error: El producto NO ha sido agregado"
                    },
                    data : {product: product, errors: errors.mapped()}
                }
                return res.json(respuesta)
             })     
        }
      },
}