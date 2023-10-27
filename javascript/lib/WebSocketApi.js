//@ts-check
import { Auth } from "./auth.js";
export class WebSocketApiManager {
    url = null
    /**@type {WebSocket} */
    socket
    currentId = 1 //cannot be 0
    unresolvedPromises = {}
    constructor(url) {
        this.url = url
    }
    getNextId() {
        return this.currentId++
    }
    destroy() {
        this.socket.close()
    }
    connect() {

        if (this.isConnected())
            return

        this.socket = new WebSocket('ws://' + this.url);

        // Connection established
        this.socket.addEventListener('open', (event) => {
            console.log('<&>opening ' + this.url);
            // @ts-ignore
            let userToken = Auth.getUserData() && Auth.getUserData().token
            if (userToken)
                this.socket.send(JSON.stringify({ type: 'connect', payload: { userToken } })); // Send a message to the server
            else
                console.log("couldn't connect to " + this.url + " because there is no user token")
        });

        // Listen for messages from the server
        this.socket.addEventListener('message', (event) => {
            let returnData = JSON.parse(event.data)
            if (returnData.id) {
                this.resolvePromise(returnData.id, returnData)
            } else if (returnData.type === 'message') {
                console.log('Message from ' + this.url + ':' + returnData.payload)
            } else if (returnData.type === 'logObject') {
                console.log('Object to log from ' + this.url + ' server:', returnData.payload)
            }
        });

        // Listen for potential errors
        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket Error ' + this.url + ':', error);
        });

        // Listen for close event
        this.socket.addEventListener('close', (event) => {
            console.log('Disconnected from the WebSocket ' + this.url + 'server');
        });

    }

    isConnected() {
        return this.socket && this.socket.readyState === 1
    }

    async resolvePromise(id, data) {
        if (this.unresolvedPromises[id]) {
            this.unresolvedPromises[id].resolve(data.payload)
            delete this.unresolvedPromises[id]
        }
    }

    async send(type, payload = {}) {
        if (!this.isConnected())
            return alert("*cannot send " + type + " not connected to " + this.url)

        let thisIndex = this.getNextId()
        let thisPromise = new Promise((resolve, reject) => {
            this.unresolvedPromises[thisIndex] = { resolve, reject }
        })
        this.socket.send(JSON.stringify({ type, payload, id: thisIndex })); // Send a message to the server
        return thisPromise
    }

}

WebSocketApiManager.url = undefined

