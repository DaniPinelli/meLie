
	// ******** Sequelize ***********

const { Product, Sequelize, Brand, Category } = require('../../database/models');
const Op = Sequelize.Op;

module.exports = {
    latest (req, res) {
        let ultimos = Product.findAll({
			order: [['createdAt', 'DESC']],
			limit: 8
        })
        .then(function(products){
            let resultado = products;
            let respuesta = {
                    meta: {
                          'status': 200,
                          'count': 8,
                          'url': '/myProducts/latest'
                    },
                    data: resultado
            }
            res.json(respuesta)
        })
    },

    offers (req, res) {
        let ultimos = Product.findAll({
			where: {
				discount: {
					[Op.gt]: 0
				}
			},
			limit: 8
		})
        .then(function(products){
            let resultado = products;
            let respuesta = {
                    meta: {
                          'status': 200,
                          'count': 8,
                          'url': '/myProducts/latest'
                    },
                    data: resultado
            }
            res.json(respuesta)
        })
    }
}