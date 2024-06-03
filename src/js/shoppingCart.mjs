import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
import { addRemoveItemEventListeners, cartTotal } from "./cart.js";

export function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  addRemoveItemEventListeners();
  cartTotal(cartItems);
  console.log(cartItems)
}

 function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price"><strong>$${item.FinalPrice}</strong></p>
    <button class="remove-item" data-index="${index}">Delete</button>
  </li>`;

  return newItem;
}