import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Handle both cases: single object or array of objects
  let itemsArray = [];
  if (Array.isArray(cartItems)) {
    itemsArray = cartItems;
  } else if (cartItems && typeof cartItems === "object") {
    itemsArray = [cartItems];
  } else {
    console.error("Error: Unexpected cartItems format.", cartItems);
    return;
  }

  const htmlItems = itemsArray.map((item) => cartItemTemplate(item)).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;
}

function cartItemTemplate(item) {
  if (!item || !item.Image || !item.Name || !item.Colors || !item.Colors.length || !item.FinalPrice) {
    console.error("Error: item has missing or incorrect properties.", item);
    return "";
  }

  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();


