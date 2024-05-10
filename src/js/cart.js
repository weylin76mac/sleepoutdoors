import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price"><strong>$${item.FinalPrice}</strong></p>
  <p>${discount(
    item.SuggestedRetailPrice,
    item.FinalPrice
  )}</p>
</li>`;

  return newItem;
}
function discount(SuggestedRetailPrice, FinalPrice) {
  const priceDifference = SuggestedRetailPrice - FinalPrice;
  const discPercentage = (priceDifference / SuggestedRetailPrice) * 100;
  return `<p class="cart-card__discount">${discPercentage.toFixed(0)}% Off</p>`;
}

renderCartContents();
