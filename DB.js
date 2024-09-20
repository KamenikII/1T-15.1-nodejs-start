const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('social_network', 'root', 'yahz', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = { sequelize }
