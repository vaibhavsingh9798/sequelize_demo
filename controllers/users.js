const User = require('../models/user')

exports.getUsers = async (req,res,next) =>{
 let data = await User.findAll()
 res.json(data)
 console.log('get')
}

exports.postUser = async (req,res,next) =>{
    let {uname,number,email} = req.body
    console.log('post',uname,number,email)
    let data = await User.create({uname,number,email})
    console.log('users...',data)
    res.json(data)
}

exports.putUser = async (req,res,next) =>{
    let uid = req.params.id
    let {uname,number,email} = req.body
    let data = await User.update({uname,number,email},{where:{id:uid}})
    res.json(data)
    console.log('put')
}

exports.deleteUser = async (req,res,next) =>{
    let uid = req.params.id;
    let data = await User.destroy({where:{id:uid}})
    res.json(data)
    console.log('delete')
}