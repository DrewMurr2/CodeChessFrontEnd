import { BASE_URL } from "../sharedVariables.js";
import { WebSocketApiManager } from "./WebSocketApi.js";

export let gameServerWebsocket = new WebSocketApiManager(BASE_URL)

export class GameServerWebsocketAPI {
    static async play() {
        return await gameServerWebsocket.send('play')
    }
    static async sendMove(move) {
        return await gameServerWebsocket.send('move', move)
    }
}