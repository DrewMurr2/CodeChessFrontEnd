export class GameDom {

    static animateMove(startRow, startCol, endRow, endCol) {
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
    /**
     * @param {string} replaceWith
     */
    static replaceGameHeader(replaceWith) {
        // @ts-ignore
        document.getElementById("gameHeader").innerHTML = replaceWith
    }

    static renderBoard(boardData) {
        console.log("renderBoard function", boardData)
        const boardSize = 8
        const killZoneSize = 6
        const board = document.getElementById('chessBoard');
        // @ts-ignore
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
            //@ts-ignore
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
        //@ts-ignore
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


}