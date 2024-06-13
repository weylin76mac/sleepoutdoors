// STEP 4 WEEK 7 PART 1!
import { getLocalStorage, setLocalStorage, removeAllAlerts, alertMessage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// STEP 6 WEEK 7
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// STEP 6 WEEK 7
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}


// STEP 4 WEEK 7 PART 2!
const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  // STEP 4 WEEK 7 PART 3!
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary(); // STEP 4 Calculates subtotal 
  },
  calculateItemSummary: function () {  // STEP 4 Calculates subtotal
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    const totalQuantity = this.list.map((item) => item.qty)
    this.totalItems = totalQuantity.reduce((sum, item) => sum + item); 
    itemNumElement.innerText = this.totalItems;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * item.qty);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerHTML = "$" + this.itemTotal.toFixed(2);
  },

  // STEP 4 Calculate the total costs
  calculateOrdertotal: function () {
    this.shipping = (10 + (this.totalItems - 1) * 2).toFixed(2);
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },

  displayOrderTotals: function () {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerHTML = `<strong>$${this.orderTotal}</strong>`;
  },

  // STEP 6 WEEK 7
  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
      return res;
      
    } catch (err) {
      removeAllAlerts();
      console.log(err);
      for (let message in err.message) {
        console.log(message)
        alertMessage(err.message[message]);
      }
    }
  },
};

// STEP 6 WEEK 7
export default checkoutProcess;