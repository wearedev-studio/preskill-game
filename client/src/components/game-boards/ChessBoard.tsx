import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';
import { Chess } from 'chess.js';
import { socket } from '../../socket';

interface ChessBoardProps {
  gameId: string;
  //   fen: string;
  //   playerColor: 'w' | 'b';
  //   isMyTurn: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  gameId,

}) => {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  function makeRandomMove() {
    const possibleMoves = chessGame.moves();

    if (chessGame.isGameOver()) {
      return;
    }

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    chessGame.move(randomMove);

    setChessPosition(chessGame.fen());
  }

  function onPieceDrop({
    sourceSquare,
    targetSquare
  }: PieceDropHandlerArgs) {
    if (!targetSquare) {
      return false;
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      setChessPosition(chessGame.fen());

      setTimeout(makeRandomMove, 500);

      return true;
    } catch {
      return false;
    }
  }

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: 'play-vs-random'
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Chessboard options={chessboardOptions} />;
    </div>
  )
};

export default ChessBoard;