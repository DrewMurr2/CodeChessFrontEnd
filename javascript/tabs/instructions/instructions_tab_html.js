export const INSTRUCTIONS_TAB_HTML = /*html*/`
        <h2>Game Instructions</h2>

<h3>There are 5 chess pieces in this game:</h3>
<ul>
    <li>
        <strong>Rook:</strong> The Rook moves horizontally or vertically, through any number of unoccupied squares.
    </li>
    <li>
        <strong>Knight:</strong> The Knight moves in an 'L' shape: two squares in a horizontal or vertical direction, then one square perpendicular to that. It's the only piece that can jump over other pieces.
    </li>
    <li>
        <strong>Bishop:</strong> The Bishop moves diagonally, through any number of unoccupied squares.
    </li>
    <li>
        <strong>Queen:</strong> The Queen can move any number of squares along a row, column, or diagonal.
    </li>
    <li>
        <strong>King:</strong> The King moves one square in any direction. 
    </li>
</ul>
<h3>Setup:</h3>
<ul>
    <li>
        The game begins with a board being randomly generated.
    </li>
    <li>
        You will randomly be assigned a color, either black or white.
    </li>
</ul>
<h3>Gameplay:</h3>
<ul>
   <li>
        The white player will always go first.
    </li>
    <li>
        The goal is to elimante all of your opponent's pieces.
    </li>
    <li>
        If 20 moves elapse without an elimination, the game is a draw.
    </li>
</ul>
<h3>Levels:</h3>
<ul>
    <li>
        The game consists of 10 levels.
    </li>
    <li>
        Each level gets progressively harder.
    </li>
    <li>
        Your time to completion of each level is tracked in the stats tab.
    </li>
</ul>



`