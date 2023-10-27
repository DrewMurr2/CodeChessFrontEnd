import { Auth } from "../../lib/auth.js";
import { BASE_URL } from "../../sharedVariables.js";
import { NavDom } from "../../nav/dom.js";
//@ts-check

export function LoginLoad() {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        // Capturing the form values
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        // Sending a POST request
        fetch("http://" + BASE_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.error) {
                if (data.error === 'User not confirmed')
                    alert('Currently I am confirming every user.\n Text me @ +1(979)402-0005 -Drew')
                else
                    alert(data.error)
            } else if (data.token && data.email) {
                Auth.setUserData(data)
                NavDom.setLoggedInAsEmail(data.email)
                alert("You are logged in.\n Playa start playin'")
            } else alert("Something went wrong")
            console.log(data);
        }).catch(function (error) {
            console.log(error);
        });

    });
    document.getElementById("logOut").addEventListener("click", function (event) {
        event.preventDefault();
        Auth.clearUserData()
        NavDom.setLoggedInAsEmail()
        NavDom.setPlayerConnectedToUrl()
        alert("Well bye then.")
    });
}