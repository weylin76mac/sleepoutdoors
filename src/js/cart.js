import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

  const htmlItems = itemsArray.map((item, index) => cartItemTemplate(item, index)).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;

  // Ensure event listeners are added after rendering the HTML
  addRemoveItemEventListeners();
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


function cartItemTemplate(item, index) {
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
    <button class="remove-item btn-style" data-index="${index}">X</button>
  </li>`;

  return newItem;
}

function addRemoveItemEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", removeItemFromCart);
  });
}

function removeItemFromCart(event) {
  const index = event.target.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // Remove the item at the given index
  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // Re-render the cart contents
}

renderCartContents();



