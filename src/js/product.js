import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// Mosiah added this
loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);
