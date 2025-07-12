import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  width: 100%;
  max-width: 520px;
  height: auto;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 5px solid #5a3a22;
  background-color: #6b4f3a;
`;

const Square = styled.div<{ isLight: boolean; isSelected: boolean; isPossibleMove: boolean; }>`
  background-color: ${props => props.isLight ? '#e8d5b7' : '#6b4f3a'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: ${props => props.isSelected ? '3px solid var(--primary-color)' : 'none'};
  box-sizing: border-box;

  &::after {
    content: '';
    display: ${props => props.isPossibleMove ? 'block' : 'none'};
    width: 30%;
    height: 30%;
    background-color: rgba(97, 218, 251, 0.5);
    border-radius: 50%;
  }
`;

const Piece = styled.div<{ color: 'w' | 'b' }>`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: ${props => props.color === 'w' ? '#f0f0f0' : '#1e1e1e'};
  border: 3px solid ${props => props.color === 'w' ? '#aaa' : '#555'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KingIcon = styled.div`
  color: #ffd700;
  font-size: 1.5em;
  font-weight: bold;
  text-shadow: 0 0 3px black;
`;

type PieceType = 'w' | 'b' | 'W' | 'B';

type PlayerColor = 'w' | 'b';

interface CheckersBoardProps {
    gameState: {
        board: (PieceType | null)[];
        currentPlayer: PlayerColor;
    };
    playerSymbol: PlayerColor;

    onMove: (move: { from: number; to: number }) => void;
}

const getOpponent = (player: PlayerColor) => (player === 'w' ? 'b' : 'w');

const findMovesForPieceClient = (board: (PieceType | null)[], index: number): { to: number, isCapture: boolean }[] => {
    const piece = board[index];

    if (!piece) return [];

    const moves: { from: number, to: number, isCapture: boolean }[] = [];

    const player = piece.toLowerCase() as PlayerColor;

    const opponent = getOpponent(player);

    const directions = [-9, -7, 7, 9];

    const isKing = piece === 'W' || piece === 'B';

    for (const dir of directions) {
        if (!isKing) {
            if ((player === 'w' && dir < 0) || (player === 'b' && dir > 0)) {
                const simpleMoveTo = index + dir;

                if (simpleMoveTo >= 0 && simpleMoveTo < 64 && !board[simpleMoveTo] && Math.abs((index % 8) - (simpleMoveTo % 8)) === 1) {
                    moves.push({ from: index, to: simpleMoveTo, isCapture: false });
                }
            }
            
            const jumpTo = index + 2 * dir;

            const capturedIndex = index + dir;

            if (jumpTo >= 0 && jumpTo < 64 && !board[jumpTo] &&
                board[capturedIndex] && board[capturedIndex]!.toLowerCase() === opponent &&
                Math.abs((index % 8) - (jumpTo % 8)) === 2) {
                moves.push({ from: index, to: jumpTo, isCapture: true });
            }
        } else {
            for (let i = 1; i < 8; i++) {
                const to = index + dir * i;

                if (to < 0 || to >= 64 || Math.abs((to % 8) - (index % 8)) !== i) break;

                const target = board[to];

                if (!target) {
                    moves.push({ from: index, to, isCapture: false });
                } else {
                    if (target.toLowerCase() === player) break;
                    
                    const jumpTo = to + dir;

                    if (jumpTo >= 0 && jumpTo < 64 && !board[jumpTo] && Math.abs((to % 8) - (jumpTo % 8)) === 1) {
                        moves.push({ from: index, to: jumpTo, isCapture: true });
                    }

                    break;
                }
            }
        }
    }
    return moves;
};


const CheckersBoard: React.FC<CheckersBoardProps> = ({ gameState, playerSymbol, onMove }) => {
    const { board, currentPlayer } = gameState;
    const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
    const [validMoves, setValidMoves] = useState<number[]>([]);

    const isMyTurn = playerSymbol === currentPlayer;

    useEffect(() => {
        if (selectedPiece !== null && isMyTurn) {
            calculateAndSetValidMoves(selectedPiece);
        }
    }, [board, selectedPiece, isMyTurn]);

    const calculateAndSetValidMoves = (selectedIndex: number | null) => {
        if (selectedIndex === null) {
            setValidMoves([]);

            return;
        }

        const mandatoryCaptures: { from: number; to: number; }[] = [];

        for (let i = 0; i < 64; i++) {
            if (board[i] && board[i]!.toLowerCase() === playerSymbol) {
                const pieceCaptures = findMovesForPieceClient(board, i).filter(m => m.isCapture);

                mandatoryCaptures.push(...pieceCaptures.map(m => ({ from: i, to: m.to })));
            }
        }

        let movesToShow: { to: number; isCapture: boolean; }[] = [];

        const movesForSelectedPiece = findMovesForPieceClient(board, selectedIndex);

        if (mandatoryCaptures.length > 0) {
            movesToShow = movesForSelectedPiece.filter(m => m.isCapture);
        } else {
            movesToShow = movesForSelectedPiece.filter(m => !m.isCapture);
        }

        setValidMoves(movesToShow.map(m => m.to));
    };

    const handleSquareClick = (index: number) => {
        if (!isMyTurn) return;

        const piece = board[index];

        if (selectedPiece !== null) {
            if (validMoves.includes(index)) {
                onMove({ from: selectedPiece, to: index });

                setSelectedPiece(null);

                setValidMoves([]);

                return;
            }
        }

        if (piece && piece.toLowerCase() === playerSymbol) {
            setSelectedPiece(index);
            calculateAndSetValidMoves(index);
        } else {
            setSelectedPiece(null);
            setValidMoves([]);
        }
    };

    return (
        <BoardContainer>
           {board.map((piece, index) => {
                const row = Math.floor(index / 8);

                const col = index % 8;
                
                const isLight = (row + col) % 2 === 0;

                return (
                    <Square
                        key={index}
                        isLight={isLight}
                        isSelected={selectedPiece === index}
                        isPossibleMove={validMoves.includes(index)}
                        onClick={() => handleSquareClick(index)}
                    >
                        {piece && (
                            <Piece color={piece.toLowerCase() as 'w' | 'b'}>
                                {piece === 'W' || piece === 'B' ? <KingIcon>♛</KingIcon> : null}
                            </Piece>
                        )}
                    </Square>
                );
            })}
        </BoardContainer>
    );
};

export default CheckersBoard;