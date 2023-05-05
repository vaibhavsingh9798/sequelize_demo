 const Product = require('../models/product')
 const  CartProduct   = require('../models/cart-item')
 

exports.getProductsItem = async (req,res,next) =>{
  let data = await Product.findAll()
  res.json(data)
 console.log('get')
}

exports.postProduct = async (req,res,next) =>{
    let {pname,price,description} = req.body
    console.log('post',pname,price,description)
    console.log('req.user...',req.user)

    //  let product = await req.user.createProduct({pname,price,description})
      let data = await Product.create({pname,price,description, user3Id:req.user.id})
      console.log('post prod...',data)
     res.json(data)
}

exports.putProduct= async (req,res,next) =>{ 
    let uid = req.params.id
    let {uname,price,description} = req.body
    let data = await Product.update({uname,price,description},{where:{id:uid}})
    res.json(data)
    console.log('put')
}

exports.deleteProduct = async (req,res,next) =>{
     let uid = req.params.id;
     let data = await Product.destroy({where:{id:uid}})
    console.log('delete')
    res.json(data)
}

exports.getCart = async (req,res,next) =>{
 console.log('cart call......')
 req.user.getCart()
 .then(cart => {
  return cart
  .getProducts()
  .then(products =>{
    // console.log('products..', products)
    res.json(products)
  })   
  //console.log('cart..',cart)
 })
 .catch(err => console.log(err))
}

exports.postCart = async (req,res,next) =>{
  let fetchedCart;
  let prodId = req.body.productId;
  let newquantity = 1;
  
  console.log('post..',prodId)
  req.user.getCart()
  .then(cart =>{
    fetchedCart = cart
       return cart.getProducts({where:{id:prodId}})
  })
  .then(products =>{
    let product;
    console.log('length...........',products.length)
      if(products.length>0){
        product = products[0]
        console.log('if b..................')
      }
      
       if(product){
        let oldquantity = product.cartItem.quantity;
        newquantity = oldquantity + 1
        console.log('updated quan...........',newquantity)
        return product
       }
       return Product.findByPk(prodId)
      })
      .then(product => {
         return fetchedCart.addProduct(product,{through:{quantity: newquantity}})
      })
      .catch(err => console.log(err))
}

exports.deleteCart =  (req,res) =>{
   let id = req.params.id;
  console.log('del...',id)
  CartProduct.destroy({where:{productId:id}})
  .then(resp => res.json(resp))
  .catch(err => console.log(err))
}