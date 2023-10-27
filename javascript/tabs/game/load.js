//@ts-check
import { GamePlay } from "./Gameplay.js";
import { gameServerWebsocket } from "../../lib/GameServerWebsocketAPI.js";
import { GameDom } from "./GameDom.js";
export let GameplayOptions = {
    consoleLogMyMoves: false,
    consoleLogOpponentMoves: false,
    autoPlayNextGame: false
}

export function GameLoad() {
    GameDom.renderBoard();
    attachButtonPresses();
    console.log("GameLoad")
    gameServerWebsocket.connect()
}

let killZoneSize = 6


function attachButtonPresses() {
    //@ts-ignore
    document.getElementById('play')
        .addEventListener('click', GamePlay.playGame);
    //@ts-ignore
    document.getElementById('console-log-game-history')
        .addEventListener('click', () => console.log('gameHistory'));
    //@ts-ignore
    document.getElementById('console-log-move-history')
        .addEventListener('click', () => console.log('moveHistory'));
    //@ts-ignore
    document.getElementById('console-log-game-board')
        .addEventListener('click', () => console.log('boardData'));

    //@ts-ignore
    document.getElementById('console-log-opponent-strategy')
        .addEventListener('click', () => console.log('opponentStrategy'));

    //@ts-ignore
    document.getElementById('console-log-my-moves')
        // @ts-ignore
        .addEventListener('change', function () { GameplayOptions.consoleLogMyMoves = this.checked; });
    // @ts-ignore
    document.getElementById('console-log-opponent-moves').addEventListener('change', function () { GameplayOptions.consoleLogOpponentMoves = this.checked; });
    // @ts-ignore
    document.getElementById('auto-play-next-game').addEventListener('change', function () { GameplayOptions.autoPlayNextGame = this.checked; });
}