import { connectToPlayerLocalWebsocket } from "../../lib/PlayerWebsocket.js";
export function SetupLoad() {
    document.getElementById("connectButton").addEventListener("click", function () {
        var url = document.getElementById("urlInput").value;
        connectToPlayerLocalWebsocket(url, true);
    });

}