let boardData = [[{ address: "a1" }, { address: "a2" }, { address: "a3" }, { address: "a4" }, { address: "a5" }, { address: "a6" }, { address: "a7" }, { address: "a8" }], [{ address: "b1" }, { address: "b2" }, { address: "b3" }, { address: "b4" }, { address: "b5" }, { address: "b6" }, { address: "b7" }, { address: "b8" }], [{ address: "c1" }, { address: "c2" }, { address: "c3" }, { address: "c4" }, { address: "c5" }, { address: "c6" }, { address: "c7" }, { address: "c8" }], [{ address: "d1" }, { address: "d2" }, { address: "d3" }, { address: "d4" }, { address: "d5" }, { address: "d6" }, { address: "d7" }, { address: "d8" }], [{ address: "e1" }, { address: "e2" }, { address: "e3" }, { address: "e4" }, { address: "e5" }, { address: "e6" }, { address: "e7" }, { address: "e8" }], [{ address: "f1" }, { address: "f2" }, { address: "f3" }, { address: "f4" }, { address: "f5" }, { address: "f6" }, { address: "f7" }, { address: "f8" }], [{ address: "g1" }, { address: "g2" }, { address: "g3" }, { address: "g4" }, { address: "g5" }, { address: "g6" }, { address: "g7" }, { address: "g8" }], [{ address: "h1" }, { address: "h2" }, { address: "h3" }, { address: "h4" }, { address: "h5" }, { address: "h6" }, { address: "h7" }, { address: "h8" }]]
for (let row of boardData) {
    for (let square of row) {
        square.piece = getRandomPiece();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const boardSize = boardData.length;
    const board = document.getElementById('chessBoard');

    for (let i = 0; i < boardSize; i++) {
        const row = board.insertRow();
        for (let j = 0; j < boardSize; j++) {
            const cell = row.insertCell();
            const isBlack = (i + j) % 2 === 1;
            cell.className = isBlack ? 'black' : 'white';
            if (boardData[i][j].piece) {
                cell.innerHTML = `<img src="media/${boardData[i][j].piece}.png" alt="${boardData[i][j].piece}" width="30px">`;
            }
        }
    }
});

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

    // Create a connection to the WebSocket server
    const socket = new WebSocket('ws://localhost:8080');

    // Connection established
    socket.addEventListener('open', (event) => {
        console.log('Connected to the WebSocket server');
        socket.send('Hello Server!'); // Send a message to the server
    });

    // Listen for messages from the server
    socket.addEventListener('message', (event) => {
        console.log('Message from server:', event.data);
    });

    // Listen for potential errors
    socket.addEventListener('error', (error) => {
        console.error('WebSocket Error:', error);
    });

    // Listen for close event
    socket.addEventListener('close', (event) => {
        console.log('Disconnected from the WebSocket server');
    });
}


class Piece {
    constructor(color, type) {
        this.color = color; // 'white' or 'black'
        this.type = type;
        this.name = color + type;
    }

    getImage() {
        return 'media/' + this.name + '.png';
    }

    addToBoard(board, row, col) {
        const cell = board.rows[row].cells[col];
        cell.innerHTML = `<img src="${this.getImage()}" alt="${this.color} ${this.type}" width="30px">`;
    }
}

function getRandomPiece() {
    const probability = (32 / 64)
    const pieces = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Pawn'];
    const colors = ['white', 'black'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return Math.random() < probability ? randomColor + randomPiece : null;
}

let pieces = [new Piece('white', 'Rook'), new Piece('white', 'Knight'), new Piece('white', 'Bishop'), new Piece('white', 'Queen'), new Piece('white', 'King'), new Piece('black', 'Bishop'), new Piece('black', 'Knight'), new Piece('black', 'Rook'), new Piece('black', 'Queen'), new Piece('black', 'King'), new Piece('white', 'Pawn'), new Piece('black', 'Pawn')];
pieces.forEach(piece => { console.log(piece.name) });

function openTab(evt, tabName) {
    // Get all elements with class="tab-content" and hide them
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tab-link" and remove the class "active"
    let tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
