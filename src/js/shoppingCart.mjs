import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
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

  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>

    <div class="cart-card-sub">
      <h3>Item:</h3>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
    </div>
    <div class="cart-card-sub">
    <h3>Color:</h3>
      <div class="cart-card__color">
        ${item.Colors[0]?.ColorName || "N/A"}
      </div>
    </div>
    <div class="cart-card-sub">
      <h3>Qty:</h3>
      <div class="quantity-selector">  
        <button id="decrease" class="quantity-button" data-index="${index}">-</button>
        <input type="number" id="quantity-input${index}" class="quantity-input" value="${item.qty || 1}" min="1" data-index="${index}" />
        <button id="increase" class="quantity-button" data-index="${index}">+</button>
      </div>
    </div>
    <div class="cart-card-sub">
      <h3>Price:</h3>
      <div class="cart-card__price">
        <strong>$${itemTotalPrice.toFixed(2)}</strong>
      </div>
    </div>
        <button class="remove-item" data-index="${index}">
          Remove
        </button>

  </li>`;

  return newItem;
}
