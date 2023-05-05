
let myForm = document.getElementById('myform');
myForm .addEventListener('submit',onSubmit)
 let ul = document.getElementById('products')
 ul.addEventListener('click',onUpdate)    
let edit = false;
let id;
function onSubmit(e){
    e.preventDefault();
    let pname = document.getElementById('pname').value
    let price = document.getElementById('price').value
    let description = document.getElementById('desc').value
    let productDetails = {pname,price,description}
    console.log(productDetails)
     document.getElementById('pname').value=""
     document.getElementById('price').value=""
     document.getElementById('desc').value=""
     if(!edit)
     postProduct(productDetails)
     else
     putProduct(productDetails)
}

const print = (item) =>{
  let li = document.createElement('li')
  li.appendChild(document.createTextNode(`${item.pname} ${item.price} ${item.description}`))
  let cartBtn = document.createElement('button')
  let editBtn = document.createElement('button')
  let delBtn = document.createElement('button')
  cartBtn.appendChild(document.createTextNode('Add to cart'))
  cartBtn.setAttribute('id',`${item.id}`)
  cartBtn.setAttribute('class','cart float-right m-1')
  editBtn.appendChild(document.createTextNode('Edit'))
  delBtn.appendChild(document.createTextNode('Delete'))
  delBtn.setAttribute('id',`${item.id}`)
  delBtn.setAttribute('class','delbtn float-right m-1')
  editBtn.setAttribute('id',`${item.id}`)
  editBtn.setAttribute('class','edit float-right m-1')
  li.appendChild(cartBtn)
   li.appendChild(editBtn)
   li.appendChild(delBtn)

  ul.appendChild(li)
}

const getProducts = () =>{
     let parentElement = document.querySelector('#products')
     parentElement.innerHTML=''
     axios.get('http://localhost:3001/products/list')
     .then(response => {
          console.log('response',response)
          console.log('response.data',response.data)
          response.data.map((item) => print(item))
     } )
     .catch(err =>  console.log('err',err) )
       
}
//  const onLoad = () =>{
//      print({pname:'phone',price:200,description:'realme phone',id:3})
//  }

 document.addEventListener('DOMContentLoaded',getProducts)
//  document.addEventListener('DOMContentLoaded',onLoad)

const postProduct = async (product) =>{
 axios.post('http://localhost:3001/products/product',product)
 .then(() => {
     console.log('data sended from frontendend')
    getProducts()
})
.catch(err => console.log('err',err))
}

const putProduct = async (product) =>{
     let response = await axios.put(`http://localhost:3001/products/product/${id}`,product)
     edit = false;
     getProducts()
}

const deleteProduct = async (id) =>{
   //  console.log('del id',id)
     let response = await axios.delete(`http://localhost:3001/products/product/${id}`)
     console.log('deleted')
     getProducts()
}

const postCart = async (id) =>{
     let response = await axios.post(`http://localhost:3001/products/cart`,{productId:id})
     console.log('post cart')
     //getProducts()
}

function onUpdate(e){
    // console.log(e.target)
     
     if(e.target.getAttribute('class') == 'delbtn float-right m-1'){
          let id = e.target.getAttribute('id') 
          deleteProduct(id)
     }
     else if(e.target.getAttribute('class') == 'edit float-right m-1'){
          edit = true;
          let data;
           id = e.target.getAttribute('id')
          let li = document.querySelectorAll('li')
          li.forEach((item) => {
               let btn = item.querySelector('button')
               if(btn){
               let btnId = btn.getAttribute('id')
               if(btnId == id)
                data = item.textContent.slice(0,-10).split(" ")
               }
          })
          document.getElementById('pname').value=data[0]
          document.getElementById('price').value=data[1]
          document.getElementById('desc').value=data[2]
     }
     else if(e.target.getAttribute('class') =='cart float-right m-1'){
          id = e.target.getAttribute('id')
          console.log('id',id)
          postCart(id)
     }

    // console.log('onUpdate')
}





