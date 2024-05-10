import productList from "./productList.mjs";
import Alert from "./Alert.js";

productList("tents", "ul.product-list");

const alert = new Alert();
alert.init();

