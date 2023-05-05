const Sequelize = require('sequelize')

const sequelize = new Sequelize('db_relationship','root','Vaibhav@123',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize;