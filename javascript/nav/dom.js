//@ts-check
export class NavDom {
    /**
     * @function setLoggedInAs
     * @param {string} email
     */
    static setLoggedInAsEmail(email) {
        if (email) {
            // @ts-ignore
            document.getElementById('loggedInAs').innerHTML = 'logged in as ' + email
            // @ts-ignore
            document.getElementById("email").value = email
        }
        else
            // @ts-ignore
            document.getElementById('loggedInAs').innerHTML = 'not logged in'

    }
    /**
     * @function setPlayerConnectedToUrl
     * @param {string} url
     */
    static setPlayerConnectedToUrl(url) {
        if (url) {
            // @ts-ignore
            document.getElementById('connectedTo').innerHTML = 'connected to ' + url
            // @ts-ignore
            document.getElementById("urlInput").value = url
        }
        else
            // @ts-ignore
            document.getElementById('connectedTo').innerHTML = 'not connected'
    }
}