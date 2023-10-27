import { Auth } from "./lib/auth.js";
import { NavDom } from "./nav/dom.js";
import { loadAllTabs } from "./tabs/loadAllTabs.js";

//@ts-check
document.addEventListener("DOMContentLoaded", function () {
    let userData = Auth.getUserData()
    loadAllTabs()
    NavDom.setLoggedInAsEmail(userData && userData.email)
    NavDom.setPlayerConnectedToUrl(userData && userData.url)
    console.log("loading the new dom load events")
});

