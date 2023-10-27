import { Auth } from "../../lib/auth.js";

export function SetupLoad() {
    document.getElementById("connectButton").addEventListener("click", function () {
        var url = document.getElementById("urlInput").value;
        connectToPlayerLocalWebsocket(url, true);
    });

    function connectToPlayerLocalWebsocket(inputUrl, isButtonPush) {
        if (!Auth.getUserData())
            return alert("You can't connect without logging in first")

        if (isConnected())
            PLAYERsocket.close()

        // Create a connection to the WebSocket server
        PLAYERsocket = new WebSocket(inputUrl);

        // Connection established
        PLAYERsocket.addEventListener('open', (event) => {
            addToUserData({ url: inputUrl })
            setConnectedDisplay()
            if (isButtonPush)
                alert("You are connected.\n Playa start playin'")
            console.log("connecting to " + inputUrl);
            console.log('Connected to the PLAYER');
            PLAYERsocket.send('Hello Server!'); // Send a message to the server
        });

        // Listen for messages from the server
        PLAYERsocket.addEventListener('message', (event) => {
            let returnData = JSON.parse(event.data)
            if (returnData.type === 'board') {

            }
        });

        // Listen for potential errors
        PLAYERsocket.addEventListener('error', (error) => {
            console.error('WebSocket Error:', error);
        });

        // Listen for close event
        PLAYERsocket.addEventListener('close', (event) => {
            console.log('Disconnected from the WebSocket server');
        });

    }


}