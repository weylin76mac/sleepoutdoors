import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { shoppingCart } from "./shoppingCart.mjs";

// Calculate the $total in the cart. If cart its empty the word total
// is removed, else gets inserted with total.
export function cartTotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    let listItems = items[i];
    let r = listItems.FinalPrice;
    sum += r;
  }

  let checkout = document.querySelector(".checkout");
  let total = document.querySelector(".cart-card__total");
  if (sum === 0) {
    total.style.display = "none";
    checkout.style.display = 'none'
  } else {
    total.style.display = "block";
    total.innerHTML = `<strong>Total: $${sum.toFixed(2)}</strong>`;
    checkout.style.display = "block";
  }
}

export function addRemoveItemEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });
}

function removeItemFromCart(event) {
  // console.log("Clicked Delete Button");
  const index = event.target.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // Remove the item at the given index
  setLocalStorage("so-cart", cartItems);
  shoppingCart(); // Re-render the cart contents
}

// loadHeaderFooter();
shoppingCart();
