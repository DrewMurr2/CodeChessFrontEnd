export interface ChessGameInterface {
  board: Row[]
  completedMoves: CompletedMove[]
  player1: Player
  player2: Player
  currentPlayer: Player
  killedPieces: PieceInterface[]
  gameComplete: boolean
  winner: Player | null
}
