import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

function isTokenValid(token) { //responsible for checking an existing token to make sure it is not expired. It should return a true or false, true if the token is still valid (unexpired), false if it is expired.
  // check to make sure a token was actually passed in.
  if (token) {
    // decode the token
    const decoded = jwtDecode(token);
    // get the current date
    let currentDate = new Date();
    // JWT exp is in seconds, the time from our current date will be milliseconds.
    if (decoded.exp * 1000 < currentDate.getTime()) {
      //token expiration has passed
      console.log("Token expired.");
      return false;
    } else {
      // token not expired
      console.log("Valid token");
      return true;
    }
    //no token...automatically return false.
  } else return false;
}

//import and call this function on any page we want protected.
// if there is a valid token it will be returned, otherwise we will redirect to the login page.
export function checkLogin() { //is responsible to check to see if the user is already logged in. How will we do that? We will check to see if there is a valid token stored in localStorage. If there is no token, or if the token is expired we should redirect the user to the login page...making sure to keep track of the page they were trying to access so we can send them back after the login!
  // get the token from localStorage
  const token = getLocalStorage(tokenKey);
  // use the isTokenValid function to check the validity of our token
  const valid = isTokenValid(token);
  // if the token is NOT valid
  if (!valid) {
    //remove stored token
    localStorage.removeItem(tokenKey);
    // redirect to login while sending the current URL along as a parameter
    // grab the current location from the browser
    const location = window.location;
    // check out what location contains
    console.log(location);
    // redirect by updating window.location =
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else return token; //if they are logged in then just return the token.
}

export async function login(creds, redirect = "/") { //responsible for sending the credentials to the authentication server and if that comes back successful it will store the authentication token that is sent back into local storage. Then we will redirect the user to whatever page they were trying to access when they were asked to login.
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}