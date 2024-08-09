document.addEventListener('DOMContentLoaded', () => {
    // Retrieve elements from the DOM
    const sectionButtons = document.querySelectorAll('.toggle-section');
    const productSections = document.querySelectorAll('.product-section');
    const cartTableBody = document.querySelector('#current-items tbody');
    const totalPriceDisplay = document.querySelector('#total-price');
    const clearCartBtn = document.getElementById('clear-cart-button');
    const checkoutBtn = document.getElementById('checkout-button');
    
    // Load cart from localStorage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Event listener for toggling product sections
    sectionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetSectionId = button.getAttribute('data-section');
        const targetSection = document.getElementById(targetSectionId);
  
        productSections.forEach(section => {
          section.classList.toggle('show', section === targetSection);
          section.classList.toggle('hidden', section !== targetSection);
        });
      });
    });
  
    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.product button').forEach(button => {
      button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('.product-info p').textContent;
        const quantityInput = productElement.querySelector('input[type="number"]');
        const quantity = parseFloat(quantityInput.value) || 0;
        const pricePerUnit = parseFloat(productElement.querySelector('.price').textContent.replace('₨ ', ''));
  
        if (quantity > 0) {
          const productIndex = cart.findIndex(item => item.name === productName);
  
          if (productIndex > -1) {
            cart[productIndex].amount += quantity;
            cart[productIndex].price = cart[productIndex].amount * pricePerUnit;
          } else {
            cart.push({ name: productName, amount: quantity, price: quantity * pricePerUnit });
          }
  
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });
  
    // Clear the cart when the button is clicked
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      localStorage.removeItem('cart');
      updateCartDisplay();
    });
  
    // Function to update the cart display
    function updateCartDisplay() {
      cartTableBody.innerHTML = '';
      let totalCost = 0;
  
      cart.forEach(item => {
        totalCost += item.price;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.amount}</td>
          <td>₨ ${item.price.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
      });
  
      totalPriceDisplay.textContent = `₨ ${totalCost.toFixed(2)}`;
    }
  
    // Initialize the cart display on page load
    updateCartDisplay();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const sampleCartItems = [
      { name: 'Product 1', price: 500, quantity: 2 },
      { name: 'Product 2', price: 300, quantity: 1 }
    ];
  
    localStorage.setItem('cartItems', JSON.stringify(sampleCartItems));
  
    function renderSampleCartItems() {
      const cartTable = document.getElementById('cart-items');
      let tableRows = '';
  
      sampleCartItems.forEach(item => {
        tableRows += `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>LKR ${item.price.toFixed(2)}</td>
            <td>LKR ${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `;
      });
  
      cartTable.innerHTML = `
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${tableRows}
      `;
    }
  
    function updateSampleCartTotal() {
      const totalElement = document.getElementById('cart-total');
      const totalAmount = sampleCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      totalElement.textContent = `LKR ${totalAmount.toFixed(2)}`;
    }
  
    renderSampleCartItems();
    updateSampleCartTotal();
  });
  

  document.getElementById('addto').addEventListener('click', function() {
    const cartItems = document.querySelectorAll('#current-items tbody tr');
    const favorites = [];

    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to the cart before saving to favorites.');
      return;
    }

    cartItems.forEach(item => {
        const product = item.querySelector('td:first-child').textContent;
        const amount = item.querySelector('td:nth-child(2)').textContent;
        const price = item.querySelector('td:nth-child(3)').textContent;
        favorites.push({ product, amount, price });
    });

    localStorage.setItem('favorites', JSON.stringify(favorites));

    alert('Your cart has been saved to favorites.');
});


document.getElementById('apply').addEventListener('click', function() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const cartBody = document.querySelector('#current-items tbody');

  // Clear current cart items
  cartBody.innerHTML = '';

  let totalPrice = 0;

  favorites.forEach(favorite => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${favorite.product}</td>
          <td>${favorite.amount}</td>
          <td>${favorite.price}</td>
      `;
      cartBody.appendChild(row);

      // Calculate total price
      const price = parseFloat(favorite.price.replace('₨ ', ''));
      totalPrice += price;
  });

  document.getElementById('total-price').textContent = `₨ ${totalPrice.toFixed(2)}`;

  alert('Your favorites have been added to the cart.');
});
