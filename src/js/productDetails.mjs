import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, addClass, sendBallAnimation, replaceText } from "./utils.mjs";
import { discount } from "./utils.mjs";

let products = {};

export default async function productDetails(productId) {
  // get the details for the current products. findProductById will return a promise! use await or .then() to process it
  products = await findProductById(productId);
  // once we have the products details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
  
}

function addToCart() {
  const currCart = getLocalStorage("so-cart") || [];
  animateAddToCart();
  checkDuplicates(currCart);
 
}

function renderProductDetails() {
  let priceFixed = products.FinalPrice.toFixed(2)
  document.querySelector("#productName").innerHTML = products.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerHTML =
    products.NameWithoutBrand;
  document.querySelector("#productImage").src = products.Images.PrimaryMedium;
  document.querySelector("#productImage").alt = products.Name;
  document.querySelector(
    "#productFinalPrice"
  ).innerHTML = `<strong>$${priceFixed}</strong>`;
  let discounts = discount(products.SuggestedRetailPrice, products.FinalPrice)
  document.querySelector(
    ".cart-card__discount"
  ).innerHTML = `${discounts}% Off`;
  document.querySelector('#tagImage').src = "/images/logos/price-tag.png"
  document.querySelector("#productColorName").innerHTML =
    products.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    products.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = products.Id;
  
  
}

function animateAddToCart() {
  sendBallAnimation(document.getElementById("addToCart"), document.querySelector("svg"));
  replaceText(
    document.getElementById("addToCart"),
    "Added!",
    2000
  );
  setTimeout(function() {
      addClass(document.querySelector(".cart"), "sproing", 1200); //make the cart icon sproing after 1.1 seconds
  }, 1100);
}

function checkDuplicates(currCart) {
  // Check Cart for Duplicate products:
  const existingProductIndex = currCart.findIndex( //Check if products is already in cart by comparing the products Id.
    (item) => item.Id === products.Id               // FindIndex returns the index of the products if exists, or -1 if it doesn't.
  )

  if (existingProductIndex === -1) {
    currCart.push(products);
    setLocalStorage("so-cart", currCart);
  } 
}