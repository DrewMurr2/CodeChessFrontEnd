export function GameLoad() {
    renderBoard();
    console.log("GameLoad")
}

let boardData
let killZoneSize = 6

function renderBoard() {
    const boardSize = 8
    const board = document.getElementById('chessBoard');
    board.innerHTML = '';  // Clear the board
    function applylablesStyling(cell) {
        cell.className = 'label';  // Assuming you might style these differently
        cell.style.border = 'none';  // Remove border
        cell.style.textAlign = 'center';  // Center the text
    }



    // Function to get column label ('a' to 'h' for standard 8x8 board)
    function getColumnLabel(col) {
        return String.fromCharCode('a'.charCodeAt(0) + col);
    }

    for (let i = 0; i < boardSize; i++) {
        const row = board.insertRow();

        // Add row labels on the left side
        const labelCell = row.insertCell();
        labelCell.innerHTML = boardSize - i;  // Chess boards count from 8 at the top to 1 at the bottom
        applylablesStyling(labelCell);

        for (let j = 0; j < boardSize; j++) {
            const cell = row.insertCell();
            const isBlack = (i + j) % 2 === 1;
            cell.className = isBlack ? 'black' : 'white';
            if (boardData && boardData[i][j].piece) {
                cell.innerHTML = `<img src="media/${boardData[i][j].piece.color + boardData[i][j].piece.type}.png" alt="${boardData[i][j].piece.color + boardData[i][j].piece.type}" width="30px">`;
            }
        }
        //insert kill zone - 6 cells
        for (let j = 0; j < killZoneSize; j++) {
            const cell = row.insertCell();
            applylablesStyling(cell);
        }
    }

    // Add column labels at the bottom
    const footerRow = board.insertRow();
    let bottomLeftCell = footerRow.insertCell()
    bottomLeftCell.innerHTML = '';  // Empty cell for bottom-left corner
    applylablesStyling(bottomLeftCell);
    for (let j = 0; j < boardSize; j++) {
        const cell = footerRow.insertCell();
        cell.innerHTML = getColumnLabel(j);
        applylablesStyling(cell);
    }
}

