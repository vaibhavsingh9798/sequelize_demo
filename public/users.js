
let myForm = document.getElementById('myform');
myForm .addEventListener('submit',onSubmit)
let ul = document.getElementById('showusers')
ul.addEventListener('click',onUpdate)    
let edit = false;
let id;
let occurence=0;
function onSubmit(e){
    e.preventDefault();
    let uname = document.getElementById('uname').value
    let number = document.getElementById('pnumber').value
    let email = document.getElementById('email').value
    let userDetails = {uname,number,email}
    console.log(userDetails)
     document.getElementById('uname').value=""
     document.getElementById('pnumber').value=""
     document.getElementById('email').value=""
     if(!edit)
     postUsers(userDetails)
     else
     putUser(userDetails)
}

const print = (item) =>{
  let li = document.createElement('li')
  li.appendChild(document.createTextNode(`${item.uname} ${item.number} ${item.email}`))
  let cartBtn = document.createElement('button')
  let delBtn = document.createElement('button')
  let editBtn = document.createElement('button')
  cartBtn.appendChild(document.createTextNode('Cart'))
  delBtn.appendChild(document.createTextNode('Delete'))
  editBtn.appendChild(document.createTextNode('Edit'))
  cartBtn.setAttribute('id',`${item.id}`)
  cartBtn.setAttribute('class','cart float-right m-1')
  delBtn.setAttribute('id',`${item.id}`)
  delBtn.setAttribute('class','delbtn float-right m-1')
  editBtn.setAttribute('id',`${item.id}`)
  editBtn.setAttribute('class','edit float-right m-1')
  li.appendChild(cartBtn)
  li.appendChild(delBtn)
  li.appendChild(editBtn)
  ul.appendChild(li)
}

const getUsers = (occurence) =>{
   
     let parentElement = document.querySelector('#showusers')
     parentElement.innerHTML=''
  
     axios.get('http://localhost:3001/users/list')
     .then(response => {
         // console.log('response',response)
         // console.log('response.data',response.data)
          response.data.map((item) => print(item))
     } )
     .catch(err =>  console.log('err',err) )
       
} 

// const getDummy = () =>{
//      let obj = {uname:'vaibhav1',number:1230,email:'vs@gmail.com',id:1}
//      print(obj)
// }

 document.addEventListener('DOMContentLoaded',getUsers)

const postUsers = async (user) =>{
 axios.post('http://localhost:3001/users/user',user)
 .then(() => {
    // console.log('data sended from frontendend')
     getUsers()
})
.catch(err => console.log('err',err))
}

const putUser = async (user) =>{
     let response = await axios.put(`http://localhost:3001/users/user/${id}`,user)
     edit = false;
     getUsers()
}

const deleteUser = async (id) =>{
   //  console.log('del id',id)
     let response = await axios.delete(`http://localhost:3001/users/user/${id}`)
     //console.log('deleted')
     getUsers()
}

function onUpdate(e){
    // console.log(e.target)
     
     if(e.target.getAttribute('class') == 'delbtn float-right m-1'){
          let id = e.target.getAttribute('id') 
          deleteUser(id)
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
          document.getElementById('uname').value=data[0]
          document.getElementById('pnumber').value=data[1]
          document.getElementById('email').value=data[2]
     }
     else if(e.target.getAttribute('class') == 'cart float-right m-1'){
           id = e.target.getAttribute('id')
          console.log('cart',id)
          window.location.href="./cart.html?id="+id
     }

    // console.log('onUpdate')
}





