import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, addClass, sendBallAnimation, replaceText, alertMessage, discount, getImageSizeForScreen } from "./utils.mjs";

let products = {};

export default async function productDetails(productId) {
  try {
    // Get the details for the current product. findProductById will return a promise, so use await or .then() to process it
    products = await findProductById(productId);
    if (!products) {
      // Product not found, handle the error gracefully
      displayErrorMessage("Product not found");
      
      const addToCartButton = document.getElementById("addToCart");
      if (addToCartButton) {
        addToCartButton.style.display = "none";
      }
      return;
    }
    // Once we have the product details we can render out the HTML
    renderProductDetails();
    // Once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching product details:", error);
    displayErrorMessage("An error has occurred while fetching product details");
  }
}
  

function renderProductDetails() {
  // Update Image Size based on screen
  const imageSize = getImageSizeForScreen();
  //console.log(imageSize)
  const imgUrl = products.Images ? products.Images[imageSize] : "";
  let priceFixed = products.FinalPrice ? products.FinalPrice.toFixed(2): "0.00";
  document.querySelector("#productName").innerText = products.Brand?.Name || "N/A";
  document.querySelector("#productNameWithoutBrand").innerText = products.NameWithoutBrand || "N/A";
  document.querySelector("#productImage").src = imgUrl || "";
  document.querySelector("#productImage").alt = products.Name || "N/A";
  document.querySelector(
    "#productFinalPrice"
  ).innerHTML = `<strong>$${priceFixed}</strong>`;
  let discounts = discount(
    products.SuggestedRetailPrice || 0,
    products.FinalPrice || 0
  );
  document.querySelector(
    ".cart-card__discount"
  ).innerHTML = `${discounts}% Off`;
  document.querySelector("#tagImage").src = "/images/logos/price-tag.png";
  document.querySelector("#productColorName").innerText =
    products.Colors?.[0]?.ColorName || "N/A";
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    products.DescriptionHtmlSimple || "N/A";
  document.querySelector("#addToCart").dataset.id = products.Id;
}

async function addToCart(e) {
  try {
    const productId = e.target.dataset.id;
    const product = await findProductById(productId);
    addProductToCart(product);
    animateAddToCart();
    alertMessage(`${product.NameWithoutBrand} added to cart`)
  } catch (error) {
    console.error("Error adding product to cart:", error);
    
  }
}

function addProductToCart(product) {
  const currCart = getLocalStorage("so-cart") || [];
  checkDuplicates(currCart, product);

  // Get the number of items in local storage and display it on the console
  const numberOfItems = currCart.length;
  //console.log("Number of items in local storage:", numberOfItems);
}

function animateAddToCart() {
  sendBallAnimation(document.getElementById("addToCart"), document.querySelector("svg"));
  replaceText(
    document.getElementById("addToCart"),
    "Added!",
    2000
  );
  setTimeout(function () {
    addClass(document.querySelector(".cart"), "sproing", 1200); //make the cart icon sproing after 1.1 seconds
  }, 1100);
}

function checkDuplicates(currCart, product) {
  // Check Cart for Duplicate products:
  const existingProductIndex = currCart.findIndex( //Check if product is already in cart by comparing the product Id.
    (item) => item.Id === product.Id // FindIndex returns the index of the product if it exists, or -1 if it doesn't.
  );

  if (existingProductIndex === -1) {
    products.qty = 1;
    currCart.push(products);
    setLocalStorage("so-cart", currCart);
  } else {
    currCart[existingProductIndex].qty += 1;
    setLocalStorage("so-cart", currCart);
  }
}

// function displayErrorMessage(message) {
//   alert(message); // Use alert or any other method to display the error message
// }
