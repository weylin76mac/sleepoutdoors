import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Get category from URL parameters
const params = new URLSearchParams(window.location.search);
const category = params.get('category');

// Call productList function with appropriate selector and category
productList('#productList', category);
loadHeaderFooter();
