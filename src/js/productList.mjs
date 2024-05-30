import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";


export function discount(SuggestedRetailPrice, FinalPrice) {
   const priceDifference = SuggestedRetailPrice - FinalPrice;
   const discPercentage = (priceDifference / SuggestedRetailPrice) * 100;
   return discPercentage.toFixed(0)
  }

function productCardTemplate(product) {
  const disc = discount(product.SuggestedRetailPrice,product.FinalPrice)
 
    return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class= "cart-card__discount">${disc}% Off. Save Today!</p></a>
    </li>
    `;
  }

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
    // get the list of products 
    const product = await getData(category);
   
    console.log(product);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, product);
    let cap = capitalize(category)
    document.querySelector(".title").innerHTML = cap;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}



