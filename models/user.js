const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    uname:{
        type :Sequelize.STRING,
        allowNull:false
    },
    number:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User ;