import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { shoppingCart } from "./shoppingCart.mjs";

// Calculate the $total in the cart. If cart is empty, the word total is removed, else it gets inserted with total.
export function cartTotal(items) {
  let sum = 0;

  // Debugging output to inspect items
  //console.log("Cart items for total calculation:", items);

  items.forEach((item) => {
    // Ensure item has valid price and quantity
    const price = parseFloat(item.FinalPrice) || 0;
    const quantity = parseInt(item.qty, 10) || 1; // Default to 1 if qty is missing or invalid

    // Debugging output to inspect item price and quantity
    //console.log(`Item price: $${price}, Quantity: ${quantity}`);

    sum += (quantity * price);
  });

  // Debugging output to inspect calculated sum
  console.log("Calculated cart total sum:", sum);

  let total = document.querySelector(".cart-card__total");
  let checkout = document.querySelector('.checkout');

  if (sum === 0) {
    total.style.display = "none";
    checkout.style.display = "none";
  } else {
    total.style.display = "block";
    total.innerHTML = `<strong>Subtotal: $${sum.toFixed(2)}</strong>`;
    checkout.style.display = "block";
  }
}

export function addRemoveItemEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });
}

export function quantityEventListeners() {
  const decreaseButtons = document.querySelectorAll("#decrease");
  const increaseButtons = document.querySelectorAll("#increase");
  const quantityInputs = document.querySelectorAll(".quantity-input");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", decreaseCartQuantity);
  });

  increaseButtons.forEach((button) => {
    button.addEventListener("click", increaseCartQuantity);
  });

  quantityInputs.forEach((input) => {
    input.addEventListener("input", inputCartQuantity);
  });
}

function removeItemFromCart(event) {
  const index = event.target.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // Remove the item at the given index
  setLocalStorage("so-cart", cartItems);
  shoppingCart(); // Re-render the cart contents
}

function decreaseCartQuantity() {
  const index = this.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];
  
  if (cartItems[index].qty > 1) {
    cartItems[index].qty -= 1;
    setLocalStorage("so-cart", cartItems);
    shoppingCart();
  }
}

function increaseCartQuantity() {
  const index = this.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];
  
  cartItems[index].qty += 1;
    setLocalStorage("so-cart", cartItems);
    shoppingCart();
}

function inputCartQuantity() {
  const index = this.dataset.index;
  let quantityInput = document.querySelector(`#quantity-input${index}`);
  let cartItems = getLocalStorage("so-cart") || [];
  
  let value = parseInt(quantityInput.value, 10);

  if (isNaN(value) || value < 1) {
    quantityInput.value = cartItems[index].qty; // Reset to stored qty if invalid input
  } else {
    cartItems[index].qty = value;
    setLocalStorage("so-cart", cartItems);
    shoppingCart();
  }
}

// Initialize the shopping cart
shoppingCart();


