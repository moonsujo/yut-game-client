// Pseudocode for the game logic
// pregame
// game
  // throw yut
  // move piece
    // shortcut
    // landing
  // check win condition
  // switch turn
  // repeat until win

/**
 * 
 * @param {boolean} hasTurn: whether the player has the turn
 * @param {number} throwCount: how many yut (dice) throws the player has left
 * @returns {boolean} whether the player can throw the yut
 */
export function canThrowYut(hasTurn, throwCount) {
  return hasTurn && throwCount > 0
}

// pass turn if nak or backdo with backdo launch false in game
// check for outcome of the throw

// pregame win check


/**
 * 
 * @param {number} tile: the location of the token on the board
 * @returns {string} 'home', 'onBoard', or 'scored' depending on tile value
 */
export function tileType(tile) {
  if (tile === -1) {
    return 'home'
  } else if (tile === 29) {
    return 'scored'
  } else {
    return 'onBoard'
  }
}

/**
 * 
 * @param {Array<Object>} pieces: the pieces of the team
 * @param {Object} moves: dictionary of key: move amount, value: count of moves available
 * @param {boolean} backdoLaunch: whether backdo launch rule is enabled
 * @returns {boolean} whether the team has a valid move from home
 */
export function hasValidMoveHome(pieces, moves, backdoLaunch) {
  // 0 is not a valid move
  let pieceOnBoard = false
  for (const piece of pieces) {
    if (tileType(piece.tile) === 'onBoard') {
      pieceOnBoard = true
    }
  }

  if (!pieceOnBoard) {
    for (const move in moves) {
      if (!backdoLaunch && parseInt(move) === -1) {
        continue
      } else if (parseInt(move) !== 0 && moves[move] > 0) {
        return true;
      }
    }
    return false;
  } else {
    for (const move in moves) {
      if (parseInt(move) !== 0 && parseInt(move) !== -1 && moves[move] > 0) {
        return true;
      }
    }
    return false;
  }
}

export function hasValidMoveBoard(currentMoves) {
    for (const move in currentMoves) {
        if (parseInt(move) !== 0 && currentMoves[move] > 0) {
            return true;
        }
    }
    return false;
}