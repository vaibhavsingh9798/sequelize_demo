const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    pname:{
        type :Sequelize.STRING,
        allowNull:false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product ;