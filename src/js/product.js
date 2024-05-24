import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// Mosiah added this
const productId = getParam("product");
productDetails(productId);

loadHeaderFooter();
// add listener to Add to Cart button
