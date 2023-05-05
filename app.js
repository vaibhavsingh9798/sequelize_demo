const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/product')
const  User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const sequelize = require('./util/database')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use((req,res,next) =>{
    User.findByPk(1,{ include: [{ model: Product }]})
    .then(user =>{
     req.user=user;
     next();
    })
    .catch(err => console.log(err))
    
})

 app.use('/users',userRoutes)
 app.use('/products',productRoutes)
app.get('/',(req,res,next) =>{
    res.send('<h1>This is HomePage</h1>')
})

Product.belongsTo(User);
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart,{through: CartItem});

// add 1 dummy data 
sequelize.sync()
.then((res) =>{
    return User.findByPk(1)
})
.then(user =>{
    if(!user){
   return  User.create({uname:'vaibhav',number:5678,email:'vs@gmail.com'})
    }
    return user

})
.then(user =>{
  return user.createCart()

})
.then(cart =>{
    app.listen(3001)
})
.catch(err => console.log(err))



// sequelize.sync()
// .then(() =>{
//     app.listen(3001)
// })
// .catch(err => console.log(err))
