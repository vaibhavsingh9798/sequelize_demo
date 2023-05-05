// let id
 let ul = document.getElementById('items')
 ul.addEventListener('click',onUpdate)

const print = (item) =>{
    let ul = document.getElementById('items')
     let li = document.createElement('li')
     let delButton = document.createElement('button')
     delButton.appendChild(document.createTextNode('Delete'))
     delButton.setAttribute('id',item.id)
     delButton.setAttribute('class','del float-right m-1')
     li.appendChild(document.createTextNode(`${item.pname} ${item.price}  ${item.description}  [quantity- ${item.cartItem.quantity}]`))
     li.appendChild(delButton)
     ul.appendChild(li)
}


const getCartItem = async (id) => {
  let ul = document.getElementById('items')
   ul.innerHTML=''
 // print({pname:'laptop',price:120,description:'dell laptop',quantity:3})
 let {data} = await axios.get('http://localhost:3001/products/cart')
  data.map((item) => print(item))
 // print({pname:'laptop',price:120,description:'dell laptop',quantity:3})
 console.log('data..',data)

}

const deleteItem = async (id) =>{
 let res = await axios.delete(`http://localhost:3001/products/cart/${id}`)
 getCartItem()
  console.log('deleted')
}

function onUpdate(e){
console.log('delItem')
if(e.target.getAttribute('class')=='del float-right m-1'){
  let id = e.target.getAttribute('id')
   deleteItem(id)
}
}

function onLoad(){
    let urlParams = new URLSearchParams(window.location.search)
    let id = urlParams.get('id')
     console.log('id',id)
     getCartItem(id)
}


window.addEventListener('DOMContentLoaded',onLoad)