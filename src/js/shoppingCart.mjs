import { getLocalStorage, renderListWithTemplate, getImageSizeForScreen } from "./utils.mjs";
import { addRemoveItemEventListeners, quantityEventListeners, cartTotal } from "./cart.js";

export function shoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  addRemoveItemEventListeners();
  quantityEventListeners();
  cartTotal(cartItems); // Calculate total after rendering items
}

function cartItemTemplate(item, index) {
  const unitPrice = item.FinalPrice || 0;
  const itemTotalPrice = unitPrice * (item.qty || 1);
  const imageSize = getImageSizeForScreen(); // Update image size
  const imgUrl = item.Images[imageSize];

  const newItem = `  
  <li class="cart-card divider">
  
    <a href="/product_pages/index.html?product=${
      item.Id
    }" class="cart-card__image">
      <div class="view-detail">
        <img
        src="${imgUrl}"
        alt="${item.Name}"
        />
        <p>View Details</p>
      </div>
    </a>
    <div class="content-group">
      <div class="cart-card-sub">
          <h2 class="card__name">${item.Name}</h2>
      </div>
      <div class="cart-card-sub">      
        <div class="cart-card__color">
          <h4>Color:</h4>
          ${item.Colors[0]?.ColorName || "N/A"}
        </div>
      </div>
      <div class="cart-card-sub">
        <div class="quantity-selector"> 
          <h4>Qty:</h4> 
          <button id="decrease" class="quantity-button" data-index="${index}">-</button>
          <input type="number" id="quantity-input${index}" class="quantity-input" value="${
           item.qty || 1 }" min="1" data-index="${index}" />
          <button id="increase" class="quantity-button" data-index="${index}">+</button>
        </div>
      </div>
  </div>    
    <div class="cart-card-sub">
      <div class="cart-card__price">
        <h4>Price</h4>
        <p><strong>$${itemTotalPrice.toFixed(2)}</strong></p>
      </div>
     <button class="remove-item" data-index="${index}">
            Delete
      </button>
    </div>
     
       

  </li>`;

  return newItem;
}
