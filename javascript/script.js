import { BASE_URL } from "./sharedVariables.js";
import * as DomLoadEvent from "./DomLoadEvent.js";
import { loadAllTabs } from "./tabs/loadAllTabs.js";
import { Auth } from "./lib/auth.js";

let killZoneSize = 6
let boardData
let __userData = undefined
// document.addEventListener("DOMContentLoaded", function () {
//     loadAllTabs()
//     renderBoard();
//     let userData = Auth.getUserData()
//     if (userData) {
//         Auth.setLoggedInAs(userData.email)
//         Auth.setConnectedDisplay(userData.url)
//     }
// });


function addToUserData(objToAdd) {
    let thisUserData = getUserData()
    if (thisUserData) {
        let newUserData = Object.assign(objToAdd, thisUserData)
        console.log('newUserData:::', newUserData)
    }
}

let PLAYERsocket
function isConnected() {
    if (!PLAYERsocket)
        return false
    return PLAYERsocket.readyState === 1
}

function play() {
    if (!getUserData() || !isConnected())
        return alert("You can't play without logging in and connecting first")
    PLAYERsocket.send('Hello Server!'); // Send a message to the server
}

function logOut() {
    localStorage.removeItem('userData')
    setUserData(undefined)
    setLoggedInAs()
    setConnectedDisplay()
    alert("Well bye then.")
}
// function renderBoard() {
//     const boardSize = 8
//     const board = document.getElementById('chessBoard');
//     board.innerHTML = '';  // Clear the board
//     function applylablesStyling(cell) {
//         cell.className = 'label';  // Assuming you might style these differently
//         cell.style.border = 'none';  // Remove border
//         cell.style.textAlign = 'center';  // Center the text
//     }



//     // Function to get column label ('a' to 'h' for standard 8x8 board)
//     function getColumnLabel(col) {
//         return String.fromCharCode('a'.charCodeAt(0) + col);
//     }

//     for (let i = 0; i < boardSize; i++) {
//         const row = board.insertRow();

//         // Add row labels on the left side
//         const labelCell = row.insertCell();
//         labelCell.innerHTML = boardSize - i;  // Chess boards count from 8 at the top to 1 at the bottom
//         applylablesStyling(labelCell);

//         for (let j = 0; j < boardSize; j++) {
//             const cell = row.insertCell();
//             const isBlack = (i + j) % 2 === 1;
//             cell.className = isBlack ? 'black' : 'white';
//             if (boardData && boardData[i][j].piece) {
//                 cell.innerHTML = `<img src="media/${boardData[i][j].piece.color + boardData[i][j].piece.type}.png" alt="${boardData[i][j].piece.color + boardData[i][j].piece.type}" width="30px">`;
//             }
//         }
//         //insert kill zone - 6 cells
//         for (let j = 0; j < killZoneSize; j++) {
//             const cell = row.insertCell();
//             applylablesStyling(cell);
//         }
//     }

//     // Add column labels at the bottom
//     const footerRow = board.insertRow();
//     let bottomLeftCell = footerRow.insertCell()
//     bottomLeftCell.innerHTML = '';  // Empty cell for bottom-left corner
//     applylablesStyling(bottomLeftCell);
//     for (let j = 0; j < boardSize; j++) {
//         const cell = footerRow.insertCell();
//         cell.innerHTML = getColumnLabel(j);
//         applylablesStyling(cell);
//     }
// }


function animateMove(startRow, startCol, endRow, endCol) {
    const board = document.getElementById('chessBoard');
    const startCell = board.rows[startRow].cells[startCol];
    const endCell = board.rows[endRow].cells[endCol];
    const pieceImg = startCell.querySelector('img');

    if (pieceImg) {
        // Calculate the distances to move
        const dx = endCell.getBoundingClientRect().left - startCell.getBoundingClientRect().left;
        const dy = endCell.getBoundingClientRect().top - startCell.getBoundingClientRect().top;

        // Apply a transform to the piece to move it
        pieceImg.style.transform = `translate(${dx}px, ${dy}px)`;

        // After animation ends, we reset the position and move the piece to the destination cell
        pieceImg.addEventListener('transitionend', function onTransitionEnd() {
            pieceImg.removeEventListener('transitionend', onTransitionEnd); // Remove the listener to avoid multiple bindings
            pieceImg.style.transform = ''; // Reset transform
            endCell.appendChild(pieceImg); // Move the piece to the destination cell
        });
    }
}
// Create a connection to the WebSocket server
const socket = new WebSocket('ws://' + BASE_URL);

// Connection established
socket.addEventListener('open', (event) => {
    console.log('Connected to the Game Host WebSocket server');
    socket.send('Hello Server!'); // Send a message to the server
});

// Listen for messages from the server
socket.addEventListener('message', (event) => {
    let returnData = JSON.parse(event.data)
    if (returnData.type === 'board') {
        boardData = returnData.payload
        renderBoard()
    } else if (returnData.type === 'move') {
        animateMove(returnData.startRow, returnData.startCol, returnData.endRow, returnData.endCol)
    }
    console.log('Message from server:', JSON.parse(event.data));
});

// Listen for potential errors
socket.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

// Listen for close event
socket.addEventListener('close', (event) => {
    console.log('Disconnected from the WebSocket server');
});



