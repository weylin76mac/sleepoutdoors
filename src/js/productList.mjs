import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export function discount(SuggestedRetailPrice, FinalPrice) {
    const priceDifference = SuggestedRetailPrice - FinalPrice;
    const discPercentage = (priceDifference / SuggestedRetailPrice) * 100;
    return discPercentage.toFixed(0);
}

function productCardTemplate(product) {
    const disc = discount(product.SuggestedRetailPrice, product.FinalPrice);
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryExtraLarge}" alt="Image of ${product.Name}" />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
            <p class="cart-card__discount">${disc}% Off. Save Today!</p>
        </a>
    </li>`;
}

export default async function productList(selector, category) {
    const element = document.querySelector(selector);
    const brandList = document.getElementById('brandList');

    // Fetch the list of products
    let products = await getData(category);
    console.log(products);

    // Function to get unique brands from products and sort them alphabetically
    function getSortedBrands(products) {
        const brands = [...new Set(products.map(product => product.Brand?.Name).filter(Boolean))];
        return brands.sort();
    }

    // Function to render brand list
    function renderBrandList(brands) {
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.addEventListener('click', () => renderListWithTemplate(productCardTemplate, element, products));
        brandList.appendChild(allButton);

        brands.forEach(brand => {
            const brandElement = document.createElement('button');
            brandElement.textContent = brand;
            brandElement.addEventListener('click', () => filterByBrand(brand));
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




