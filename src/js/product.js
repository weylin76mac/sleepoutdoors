import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// Mosiah added this
const productId = getParam("product");
productDetails(productId);


