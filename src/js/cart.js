import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { shoppingCart } from "./shoppingCart.mjs";

// Calculate the $total in the cart. If cart its empty the word total
// is removed, else gets inserted with total.
export function cartTotal(items) {
  let sum = 0;
  items.forEach((item) => sum += (item.qty * item.FinalPrice));
  // console.log(sum);
  // for (let i = 0; i < items.length; i++) {
  //   let listItems = items[i];
  //   let r = listItems.FinalPrice;
  //   sum += r;
  // }
  
 
  let total = document.querySelector(".cart-card__total");
  if (sum === 0) {
    total.style.display = "none";
    checkout.style.display = "none"
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

export function quantityEventListeners() {
  const decreaseButton = document.querySelectorAll("#decrease");
  const increaseButton = document.querySelectorAll("#increase");
  const quantityInput = document.querySelectorAll(".quantity-input");

  decreaseButton.forEach((button) => {
    button.addEventListener("click", decreaseCartQuantity)
  })

  increaseButton.forEach((button) => {
    button.addEventListener("click", increaseCartQuantity)
  })

  quantityInput.forEach((input) => {
    input.addEventListener("input", inputCartQuantity)
  })
}

function removeItemFromCart(event) {
  // console.log("Clicked Delete Button");
  const index = event.target.dataset.index;
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // Remove the item at the given index
  setLocalStorage("so-cart", cartItems);
  shoppingCart(); // Re-render the cart contents
}


function decreaseCartQuantity() {
  const index = this.dataset.index;
  const quantityInput = document.querySelectorAll(".quantity-input");
  let cartItems = getLocalStorage("so-cart") || [];
  
  let currQty = cartItems[index].qty;
  if (currQty > 1) {
      cartItems[index].qty -= 1;
      setLocalStorage("so-cart", cartItems)
      quantityInput.value = cartItems[index].qty;
      shoppingCart();
  }
}

function increaseCartQuantity() {
  const index = this.dataset.index;
  const quantityInput = document.querySelectorAll(".quantity-input");
  let cartItems = getLocalStorage("so-cart") || [];
  
  cartItems[index].qty += 1;
  setLocalStorage("so-cart", cartItems)
  quantityInput.value = cartItems[index].qty;
  shoppingCart();
}

function inputCartQuantity() {
  const index = this.dataset.index;
  let quantityInput = document.querySelector(`#quantity-input${index}`);
  let cartItems = getLocalStorage("so-cart") || [];
  
  let value = parseInt(quantityInput.value, 10);

  if (isNaN(value) || value < 1) {
      quantityInput.value = cartItems[index].qty;
  } else {
      cartItems[index].qty = value;
      setLocalStorage("so-cart", cartItems);
      shoppingCart();
  }
};

//loadHeaderFooter(); 
shoppingCart();

