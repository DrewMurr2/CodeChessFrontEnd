//@ts-check
import { BASE_URL } from "../sharedVariables.js";
import { Auth } from "../lib/auth.js";
import { GameDom } from "../tabs/game/GameDom.js";
import { GamePlay } from "../tabs/game/Gameplay.js";
class HostWebsocket {
    static socket

    static isConnected() {
        return this.socket && this.socket.readyState === 1
    }
    /**
     * @param {'Play' | 'Move'} type 
     * @param {Object} payload
     */
    static sendMessage(type, payload = {}) {
        if (!this.isConnected()) {
            this.connect()
            setTimeout(() => {
                //waiting 10 seconds for connection to finish and then trying again
                this.sendMessage(type, payload)
            }, 10000);
            return alert("Connecting to game server...\nIf this takes more than 30 seconds, try again.")
        }
        this.socket.send(JSON.stringify({ type, payload })); // Send a message to the server
    }
    static connect() {

        this.socket = new WebSocket('ws://' + BASE_URL);

        // Connection established
        this.socket.addEventListener('open', (event) => {
            console.log('Connected to the Game Host WebSocket server');
            // @ts-ignore
            let userToken = Auth.getUserData() && Auth.getUserData().token
            if (userToken)
                this.socket.send(JSON.stringify({ type: 'connect', payload: { userToken } })); // Send a message to the server
            else
                console.log("couldn't connect to game server because there is no user token")
        });

        // Listen for messages from the server
        this.socket.addEventListener('message', (event) => {
            let returnData = JSON.parse(event.data)
            if (returnData.type === 'message') {
                console.log('Message from game server:' + returnData.payload)
            } else if (returnData.type === 'logObject') {
                console.log('Object from game server:', returnData.payload)
                // boardData = returnData.payload
                // renderBoard()
            } else if (returnData.type === 'gameData') {
                GamePlay.receiveGameFromServer(returnData.payload)
                // animateMove(returnData.startRow, returnData.startCol, returnData.endRow, returnData.endCol)
            }
            console.log('Message from server:', JSON.parse(event.data));
        });

        // Listen for potential errors
        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket Error:', error);
        });

        // Listen for close event
        this.socket.addEventListener('close', (event) => {
            console.log('Disconnected from the WebSocket server');
        });

    }
}

/**
 * @typedef {Object} MessageFromGameServer
 * @property {'message' | 'logObject' | 'gameHeaderHTML' | 'gameData' | 'move'} type
 */