import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function filterTents(products) {
  return products.slice(0, 4); // Slice the products array to include only the first 4 items. Later if we want to select random we can change.
}
export function discount(SuggestedRetailPrice, FinalPrice) {
   const priceDifference = SuggestedRetailPrice - FinalPrice;
   const discPercentage = (priceDifference / SuggestedRetailPrice) * 100;
   return discPercentage.toFixed(0)
  }

function productCardTemplate(product) {
  const disc = discount(product.SuggestedRetailPrice,product.FinalPrice)
 
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class= "cart-card__discount">${disc}% Off. Save Today!</p></a>
    </li>`;
  }

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
    // get the list of products 
    const product = await getData(category);
    const tents = filterTents(product) // call the function passing the list of tents
    console.log(product);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, tents);
    document.querySelector(".title").innerHTML = category;
}



