// ITEMS IN STOCK
const products = {
  product1: {
    name: 'Bolsa para premios',
    price: '200.00',
    description: 'Bolsa de cintura portátil para entrenamiento de mascotas. Tela de nailon con forro ripstop para un uso duradero y prolongado',
    srcImg: '../assets/img/Tienda/1.jpg'
  },
  product2: {
    name: 'Kit de obstaculos',
    price: '1832.00',
    description: 'Tela de poliéster. Túnel: 140x60cm. Caja de pausa: 87x87cm. Bastones de eslalom (8): 60cm. Barra transversal: 85cm. Funda de transporte: 89x21cm ',
    srcImg: '../assets/img/Tienda/2.jpg'
  },
  product3: {
    name: 'Clicker básico',
    price: '69.50',
    description: 'Conveniente llavero y accesorio de muñeca. Su diseño ergonómico lo hace cómodo y seguro. Es un método de entrenamiento positivo que aumenta la confianza de tu perro mientras su enfoque mejora.',
    srcImg: '../assets/img/Tienda/3.jpg'
  },
  product4: {
    name: 'Correa de entrenamiento',
    price: '480.50',
    description: ' Cuerda de alta calidad, más fuerte que la cuerda de tracción estándar. A prueba de masticar. Con un diámetro de 5/16 pulgadas, cierre de clip giratorio resistente al desgaste de 360°.',
    srcImg: '../assets/img/Tienda/4.jpg'
  },
  product5: {
    name: 'Pelota dispensadora',
    price: '229.00',
    description: 'Set X2 Pelotas rebotadoras de goma y dispensador de croquetas para mascotas. Ideales para la higiene dental y cuidado de tu perro. Chica (5cm).',
    srcImg: '../assets/img/Tienda/5.jpg'
  },
  product6: {
    name: 'Campana',
    price: '260.50',
    description: 'Paquete de 3. Herramienta perfecta para tu mascota: paciencia para entrenar la mayoría de las mascotas son capaces de aprender a golpear las campanas para salir al aire libre, comer o ir al baño.',
    srcImg: '../assets/img/Tienda/6.jpg'
  },
  product7: {
    name: 'Juguete masticable',
    price: '289.00',
    description: 'Colorido juguete de tortuga con cuerda molar en la cola, el caparazón está hecho de nailon + caucho suave, que es más resistente a las mordeduras. Adecuado para masticadores agresivos grandes, medianos y pequeños.',
    srcImg: '../assets/img/Tienda/7.jpg'
  },
  product8: {
    name: 'Juguete Educativo',
    price: '280.50',
    description: 'Juguete educativo lleno de diversión. No solo requiere que el cachorro huela la comida, sino que también necesita mover el rompecabezas para obtener la comida. ',
    srcImg: '../assets/img/Tienda/8.jpg'
  },
  product9: {
    name: 'Alfombra interactiva',
    price: '672.40',
    description: 'Lavable y fácil de usar: diseño inferior antideslizante, el cojín no es fácil de mover para las mascotas que juegan.',
    srcImg: '../assets/img/Tienda/9.jpg'
  },
  product10: {
    name: 'Tapete de carbono',
    price: '525.72',
    description: 'Atrapa la humedad mediante una capa superior acolchada. Controla el mal olor. Rápida absorción que reduce salpicaduras y manchas. Utilícelo para entrenamientos, como ropa de cama o trabajos sucios. 120pzas.',
    srcImg: '../assets/img/Tienda/10.jpg'
  },
  product11: {
    name: 'Tazon plegable',
    price: '148.27',
    description: '1pcs verde + 1pcs azul. Tamaño: Diámetro superior: 128 mm, Diámetro inferior: 88 mm, Altura interior: 10-53 mm. Diseño plegable y portátil, pequeño y manejable.',
    srcImg: '../assets/img/Tienda/11.jpg'
  },
  product12: {
    name: 'Dispensador interactivo',
    price: '299.00',
    description: 'Juguete con aperturas que promueven una alimentación lenta mientras juega. Fortalece su IQ. Reduce el estrés, la ansiedad y mantiene la atención de tu perro. ',
    srcImg: '../assets/img/Tienda/12.jpg'
  }
}

// ITEMS TEMPLATE
const prodTemplate = document.getElementById('prodTemplate').content;
const prodContainer = document.querySelector('.productContainer');
const fragment = document.createDocumentFragment();


// ADD ITEMS TO DOM
Object.values(products).forEach(product => {
  prodTemplate.querySelector('.divInfo .itemName').textContent = product.name;
  prodTemplate.querySelector('.divPriceButton .price').textContent = product.price;
  prodTemplate.querySelector('.divInfo .itemDescription').textContent = product.description;
  prodTemplate.querySelector('.imageContainer img').setAttribute('alt', product.name);
  prodTemplate.querySelector('.imageContainer img').setAttribute('src', product.srcImg);
  const clone = prodTemplate.cloneNode(true);
  fragment.appendChild(clone);
});
prodContainer.appendChild(fragment);

// CART
let cart = {}
const tableTemplate = document.getElementById('addToCart').content;
const tbodyCart = document.getElementById('cartBody');
const tableFragment = document.createDocumentFragment();
const footemplate = document.getElementById('tfooter').content;
const tfootCart = document.getElementById('footer');

prodContainer.addEventListener('click', e => {

  if (e.target.textContent === "Agregar") {
    showCartTable();
    setCart(e.target.parentElement.parentElement);
  };
  e.stopPropagation();
});
const setCart = e => {
  const cartContent = {
    name: e.querySelector('.divInfo .itemName').textContent,
    price: e.querySelector('.divPriceButton .price').textContent,
    quantity: 1
  };
  if (cart.hasOwnProperty(cartContent.name)) {
    cart[cartContent.name].quantity += 1
  } else {
    cart[cartContent.name] = {
      ...cartContent
    };
  };
  updateTable(cart)
};

const updateTable = objectCart => {
  Object.values(objectCart).forEach(object => {
    const cloneTable = tableTemplate.cloneNode(true);
    cloneTable.getElementById('product').textContent = object.name;
    cloneTable.getElementById('cant').textContent = object.quantity;
    let totalPrice = parseFloat(object.price) * object.quantity;
    cloneTable.getElementById('itemPrice').textContent = totalPrice.toFixed(2);
    tableFragment.appendChild(cloneTable);
  });
  tbodyCart.innerHTML = '';
  tbodyCart.appendChild(tableFragment);
  showFooter();
};
const showFooter = () => {
  tfootCart.innerHTML = '';
  if (Object.keys(cart).length === 0) {
    tfootCart.innerHTML = '<tr><td colspan = 3>¡No hay ningun elemento en el carrito!</td></tr>'
  } else {
    const total = Object.values(cart).reduce((acc, {
      quantity,
      price
    }) => acc + (quantity * price), 0)
    footemplate.getElementById('totalPay').textContent = total.toFixed(2);
    const cloneFoot = footemplate.cloneNode(true);
    fragment.appendChild(cloneFoot);
    tfootCart.appendChild(fragment);


    // DROP CART
    const dropItems = document.getElementById('dropCartItems');
    dropItems.addEventListener('click', () => {
      cart = {};
      updateTable(cart);
      showFooter();
    });
  };
};

// INCREASE AND DECREASE ITEMS
tbodyCart.addEventListener('click', e => {

  if (e.target.classList.contains('button')) {
    increaseDecrease(e.target)
  };
});
const increaseDecrease = boton => {
  if (boton.textContent === '+') {
    const index = boton.parentElement.parentElement.firstElementChild.textContent;
    Object.values(cart).forEach(element => {
      if (element.name === index) {
        cart[element.name].quantity++;
      };
    });
  };
  if (boton.textContent === '-') {
    const index = boton.parentElement.parentElement.firstElementChild.textContent;
    Object.values(cart).forEach(element => {
      if (element.name === index) {
        cart[element.name].quantity--;
        if (cart[element.name].quantity === 0) {
          delete cart[element.name];
        };
      };
    });
  };
  updateTable(cart);
  showFooter();
};

let counter = 0;

function countingClicks() {
  document.getElementById("counting").innerHTML = ++counter;

}

function showCartTable() {
  $("#cartTable").show();
};