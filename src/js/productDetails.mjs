import { getLocalStorage, setLocalStorage, addClass, sendBallAnimation, replaceText } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { discount } from "./productList.mjs";



function addProductToCart(product) {
  //Because localStorage only deals with strings, and we have an object, we set getLocalStorage to default to an array, then push the product to the array. Same process repeated in cart.js
  const currCart = getLocalStorage("so-cart") || [];
  currCart.push(product);
  setLocalStorage("so-cart", currCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  sendBallAnimation(document.getElementById("addToCart"), document.querySelector("svg"));

  replaceText(
    document.getElementById("addToCart"),
    "Added!",
    2000
  );
  setTimeout(function() {
      addClass(document.querySelector(".cart"), "sproing", 1200); //make the cart icon sproing after 1.1 seconds
  }, 1100)
};

export default async function productDetails(productId) {
  try {
    const productData = await findProductById(productId);
    if (!productData) {
      // Product not found, handle the error gracefully

      displayErrorMessage("Product not found");

      const addToCartButton = document.getElementById("addToCart");
      if (addToCartButton) {
        addToCartButton.style.display = "none";
      }
      return;
    }

    
    
    // Populate product details
    document.getElementById("productName").innerText = productData.Brand?.Name || "N/A";
    document.getElementById("productNameWithoutBrand").innerText = productData.NameWithoutBrand || "N/A";
    document.getElementById("productImage").src = productData.Image || "";
    document.getElementById("productImage").alt = `Name is ${productData.Name || "N/A"}`;
    document.getElementById("productFinalPrice").innerHTML = `<strong>$${productData.FinalPrice || 0}</strong>`;
    document.getElementById("productColorName").innerText = productData.Colors?.[0]?.ColorName || "N/A";
    document.getElementById("productDescriptionHtmlSimple").innerHTML = productData.DescriptionHtmlSimple || "N/A";
    document.getElementById("addToCart").dataset.id = productData.Id;

    document.querySelector("#tagImage").setAttribute("src", "/images/logos/price-tag.png");
    document.querySelector(".cart-card__discount").innerHTML = `${discount(
      productData.SuggestedRetailPrice || 0,
      productData.FinalPrice || 0
    )}% Off`;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching product details:", error);
    displayErrorMessage("An error occurred while fetching product details");
  }
}

function displayErrorMessage(message) {
  // Display error message to the user, you can customize this based on your UI
  alert(message); // Example: Showing an alert box with the error message
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

