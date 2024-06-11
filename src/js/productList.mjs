import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate, capitalize } from "./utils.mjs";



function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="oldPrice">$${product.SuggestedRetailPrice.toFixed(2)}</p>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      
    </li>
    `;
  }

export default async function productList(selector, category) {
    const element = document.querySelector(selector);

    const brandList = document.getElementById("brandList");
    
    // Fetch the list of products
    let products = await getProductsByCategory(category);
    //console.log(products);
    
    document.querySelector('.title').innerHTML = `| ${capitalize(category)}`
    // Function to get unique brands from products and sort them alphabetically
    function getSortedBrands(sortedProducts) {
        let brandNames = [];
        for (let i = 0; i < sortedProducts.length; i++) {
        if (sortedProducts[i].Brand && sortedProducts[i].Brand.Name) {
        brandNames.push(sortedProducts[i].Brand.Name);
    }
    }
    let uniqueBrandNames = [];
    let brandNameSet = new Set();
    
    for (let i = 0; i < brandNames.length; i++) {
        if (!brandNameSet.has(brandNames[i])) {
            brandNameSet.add(brandNames[i]);
            uniqueBrandNames.push(brandNames[i]);
        }
    }
    
    let validBrandNames = [];

    for (let i = 0; i < uniqueBrandNames.length; i++) {
        if (uniqueBrandNames[i]) { // Check if the value is not undefined or null
        validBrandNames.push(uniqueBrandNames[i]);
    }
    }

        return validBrandNames.sort(); // Sort the brand names alphabetically
    }
    

    // Function to render brand list
    function renderBrandList(brands) {
        const allButton = document.createElement("button");
        allButton.textContent = "All";
        allButton.addEventListener("click", () => renderListWithTemplate(productCardTemplate, element, products));
        brandList.appendChild(allButton);

        brands.forEach(brand => {
            const brandElement = document.createElement("button");
            brandElement.textContent = brand;
            brandElement.addEventListener("click", () => filterByBrand(brand));
            brandList.appendChild(brandElement);
        });
    }

    // Function to filter products by brand
    function filterByBrand(brand) {
        const filteredProducts = products.filter(product => product.Brand && product.Brand.Name === brand);
        renderListWithTemplate(productCardTemplate, element, filteredProducts);
    }
    
    // Initial rendering of product list
    renderListWithTemplate(productCardTemplate, element, products);
   

    // Get sorted brands and render the brand list
    const sortedBrands = getSortedBrands(products);
    
    renderBrandList(sortedBrands);
    
}




