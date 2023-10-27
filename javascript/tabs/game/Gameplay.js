import { GameServerWebsocketAPI } from '../../lib/GameServerWebsocketAPI.js'
import { GameDom } from "./GameDom.js"
export class GamePlay {
    static async playGame() {
        console.log("playGame function")
        let playGameResponse = await GameServerWebsocketAPI.play()
        console.log('playGameResponse:', playGameResponse)
        GameDom.renderBoard(playGameResponse.board)
        console.log("Rendering board+++")
    }
    /**
     * @param {ChessGameInterface} chessGame 
     */
    // static receiveGameFromServer(chessGame) {
    //     GameDom.renderBoard(chessGame.board)
    // }
}

/**
 * @typedef {import('./game').ChessGameInterface} ChessGameInterface
 */