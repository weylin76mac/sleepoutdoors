// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  if (!list || list.length === 0) {
    parentElement.innerHTML =
      '<div class="empty-cart-img"><p>Your cart is empty</p><a href="/index.html" title="Home"/><img src="/images/logos/shopping-cart.png" alt="empty shopping cart created by Taufik - Flaticon"></a></div>';
    return;
  }
  
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }

  //Mosiahs changes, Camila was a life saver on this!
  //This is where the Backpack number is coming from!
  const totalitmes = document.getElementById("cartCount");
  // Updates the Number of items in the backpack!
  const currCart = getLocalStorage("so-cart") || [];
  const numberOfItems = currCart.length;
  totalitmes.innerHTML = numberOfItems; 
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter() {
  console.log("loading header and footer...")
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}

function removeClass(element, className){ //create a function that takes a thing
  element.classList.remove(className); //and removes the class className from it
};

export function addClass(element, className, duration = 0){ //create a function that takes a thing
  element.classList.add(className); //and gives the class to the thing
  if (duration != 0) {
  setTimeout(removeClass, duration, element, className)//set a timeout to remove the class from the thing x (default 0) seconds later
  }
};

export function sendBallAnimation(from, to, ballSize = 20) {
  let fromRect = from.getBoundingClientRect();
  let toRect = to.getBoundingClientRect();
  var ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.cssText = `
    position: absolute;
    left: var(--button-x);
    top: var(--button-y);
    width: ${ballSize}px;
    height: ${ballSize}px;
    background-color: #525b0f;
    border-radius: 50%;
    animation: moveToCartX 1s ease-in-out forwards, moveToCartY 1s ease-in-out forwards;
    z-index: 1;
    display: none;
    --to-x: ${toRect.x}px;
    --from-x: ${fromRect.x}px;
    --to-y: ${toRect.y}px;
    --from-y: ${fromRect.y + (.5 * ballSize)}px;
  `;
  
  document.body.appendChild(ball);
  
  setTimeout(function() {
    ball.style.display = "block"; // Show the ball after a short delay
  }, 10);
  setTimeout(function() {
    ball.remove(); // Make the ball disappear after 1.1 seconds
  }, 1100);
}

function maintainWidth(element) { //function to ensure the button stays the same size
  let rect = element.getBoundingClientRect(); // Get the paramaters of the button
  element.style.setProperty("width", rect.width + "px") //Set the button to a fixed width
}

export function replaceText(element, text, duration) {
  let originalText = element.innerText;
  maintainWidth(element);
  element.innerText = text;
  setTimeout(function() {
    element.innerText = originalText;
  }, duration);
  addClass(element, "clicked", duration);
}

// capitalize first letter of a word function
export function capitalize(word) {
   return word.charAt(0).toUpperCase() + word.slice(1)};

// Price discount
export function discount(SuggestedRetailPrice, FinalPrice) {
  const priceDifference = SuggestedRetailPrice - FinalPrice;
  const discPercentage = (priceDifference / SuggestedRetailPrice) * 100;
  return discPercentage.toFixed(0);
}   

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}