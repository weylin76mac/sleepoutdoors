import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  cartTotal(cartItems)
}

// Calculate the $total in the cart. If cart its empty the word total 
// is removed, else gets inserted with total.
function cartTotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    let listItems = items[i];
    let r = listItems.FinalPrice;
    sum += r;
  }
  let total = document.querySelector(".cart-card__total");
  if (sum === 0) {
    total.style.display = "none";
  } else {
    total.style.display = "block";
    total.innerHTML = `<strong>Total: $${sum.toFixed(2)}</strong>`;
  }
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
 
</li>`;

  return newItem;
}


renderCartContents();
