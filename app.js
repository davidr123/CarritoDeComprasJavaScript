const carrito        = document.querySelector('#carrito');
const template       = document.querySelector('#template');
const fragment       = document.createDocumentFragment();
const footer         = document.querySelector('#footer');
const templatefooter = document.querySelector('#templatefooter');



document.addEventListener('click', (e)=>{
  

    // CargarData();
    if(e.target.matches('.btn-outline-primary')){
        AñadirCarrito(e);
    }


    if(e.target.matches('.btn-success')){
        AumentarCantidad(e);
    }

    if(e.target.matches('.btn-danger')){
        QuitarCantidad(e);
    }
});



 ArrayProductos=[];

const AñadirCarrito=(e)=>{
  
   const  producto={
        titulo  : e.target.dataset.fruta,
        id      : e.target.dataset.fruta,
        cantidad: 1,
        precio  : parseInt(e.target.dataset.precio) 
    }


const indice = ArrayProductos.findIndex(item=> item.id === producto.id);

if(indice === -1){
    ArrayProductos.push(producto);
}else{
    ArrayProductos[indice].cantidad ++;
}
console.log(ArrayProductos);
pintarCarrito();

GuardarData();
}

const pintarCarrito=()=>{

    carrito.textContent='';
    ArrayProductos.forEach(item=>{
        const clone = template.content.cloneNode(true);
        clone.querySelector('.text-white .lead').textContent= item.titulo;
        clone.querySelector('.badge').textContent= item.cantidad;

        clone.querySelector('.list-group-item .lead span').textContent= item.precio * item.cantidad;
        clone.querySelector('.btn-danger').dataset.precio= item.id;
        clone.querySelector('.btn-success').dataset.precio= item.id;
        fragment.appendChild(clone);

    });

    carrito.appendChild(fragment);

    pintarFooter();
}


const AumentarCantidad=(e)=>{

    ArrayProductos = ArrayProductos.filter(item=>{

        if( item.id === e.target.dataset.precio){
            console.log(item.id);
            console.log(e.target.dataset.precio)
            item.cantidad ++;
        }

        return item;
    } );

    pintarCarrito();
}


const QuitarCantidad=(e)=>{

    ArrayProductos= ArrayProductos.filter(item=>{
        if(item.id=== e.target.dataset.precio){
           if(item.cantidad>0){
               item.cantidad--;
               if(item.cantidad===0)return
               return item;
           }

          
        }else{return item}
    });

    pintarCarrito();
}


const pintarFooter=()=>{

    footer.textContent='';
 const total = ArrayProductos.reduce((acc, array)=> acc + array.cantidad * array.precio,0)
 console.log(total);

 if( total===0) return;
 const clone= templatefooter.content.cloneNode(true);
 clone.querySelector('.card span').textContent = total;
 footer.appendChild(clone);


}

const GuardarData=()=>{

    localStorage.setItem('productos', JSON.stringify(ArrayProductos))
}



const CargarData=()=>{
    ArrayProductos= JSON.parse(localStorage.getItem('productos'));
    console.log(ArrayProductos);
}




