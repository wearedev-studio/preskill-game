import React from 'react';
import styled from 'styled-components';

const GameStatus = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  min-height: 32px;
  font-size: 1.5rem;
  text-align: center;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 300px;
  height: 300px;
  gap: 10px;
`;

const SquareButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: var(--dark-surface);
  border: none;
  border-radius: 8px;
  font-size: 3rem;
  font-weight: bold;
  color: var(--light-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover:enabled {
    background-color: #4a505c;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

interface TicTacToeBoardProps {
    gameState: {
        board: (string | null)[];
        currentPlayer: 'X' | 'O';
    };

    playerSymbol: 'X' | 'O';

    onMove: (move: { index: number }) => void;
}

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({ gameState, playerSymbol, onMove }) => {
    const { board, currentPlayer } = gameState;

    const isMyTurn = playerSymbol === currentPlayer;
    
    const handleSquareClick = (index: number) => {
        onMove({ index });
    };

    const status = isMyTurn ? 'Ваш ход' : 'Ход оппонента';

    return (
        <div>
            <GameStatus>{status}</GameStatus>
            <BoardGrid>
                 {board.map((value, i) => (
                    <SquareButton
                        key={i}
                        onClick={() => handleSquareClick(i)}
                        disabled={!isMyTurn || !!value}
                    >
                        {value}
                    </SquareButton>
                ))}
            </BoardGrid>
        </div>
    );
};

export default TicTacToeBoard;