import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type PlayerColor = 'w' | 'b';
type PointData = { color: PlayerColor; count: number } | null;

interface BackgammonBoardProps {
    gameState: {
        board: PointData[];
        dice: number[];
        currentPlayer: PlayerColor;
    };
    playerSymbol: PlayerColor;
    onMove: (move: { from: number; to: number }) => void;
}

const BoardContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 900px;
    background-color: #c3a17e;
    border: 10px solid #4a3a2a;
    padding: 10px;
    box-sizing: border-box;
    gap: 20px;
`;

const HalfBoard = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const PointRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const Bar = styled.div`
    flex: 1;
    background-color: #a18468;
    border-left: 2px solid #4a3a2a;
    border-right: 2px solid #4a3a2a;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
`;

const Point = styled.div<{ isTop: boolean; isLight: boolean; isSelected?: boolean; isPossibleMove?: boolean; }>`
    width: 100%;
    height: 30vh;
    min-height: 250px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: ${props => props.isTop ? 'column' : 'column-reverse'};
    
    background-color: ${props => props.isSelected ? 'rgba(97, 218, 251, 0.2)' : 'transparent'};
    
    // Сам треугольник
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        clip-path: polygon(50% 100%, 0 0, 100% 0);
        background-color: ${props => props.isLight ? '#f0d9b5' : '#8a6e50'};
        transform: ${props => props.isTop ? 'rotate(180deg)' : 'none'};
        z-index: 0;
    }

    &::after { // Подсветка возможных ходов
        content: '';
        display: ${props => props.isPossibleMove ? 'block' : 'none'};
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(97, 218, 251, 0.3);
        z-index: 2;
    }
`;

const Piece = styled.div<{ color: PlayerColor; index: number }>`
    width: 85%;
    padding-bottom: 85%;
    height: 0;
    border-radius: 50%;
    background-color: ${props => props.color === 'w' ? '#f0f0f0' : '#1e1e1e'};
    border: 3px solid ${props => props.color === 'w' ? '#aaa' : '#555'};
    box-shadow: inset 0 0 10px rgba(0,0,0,0.4);
    z-index: 1;
    position: relative;
    margin-top: ${props => props.index > 0 ? '-75%' : '0'};
`;

const BackgammonBoard: React.FC<BackgammonBoardProps> = ({ gameState, playerSymbol, onMove }) => {
    const { board, currentPlayer, dice } = gameState;
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<number[]>([]);

    const isMyTurn = playerSymbol === currentPlayer;

    useEffect(() => {
        setSelectedPoint(null);
        setPossibleMoves([]);
    }, [currentPlayer, dice]);

    const handlePointClick = (index: number) => {
        if (!isMyTurn || dice.length === 0) return;

        const pointContent = board[index];

        if (selectedPoint !== null) {
            if (possibleMoves.includes(index)) {
                onMove({ from: selectedPoint, to: index });
            }

            setSelectedPoint(null);

            setPossibleMoves([]);
        } else if (pointContent && pointContent.color === playerSymbol) {
            setSelectedPoint(index);

            const direction = playerSymbol === 'w' ? 1 : -1;

            const moves = dice
                .map(die => index + die * direction)
                .filter(to => {
                    if (to <= 0 || to >= 25) return false;

                    const destinationPoint = board[to];

                    if (destinationPoint === null) return true;

                    if (destinationPoint.color === playerSymbol) return true;

                    if (destinationPoint.count <= 1) return true;

                    return false;
                });

            setPossibleMoves(moves);
        }
    };

    const renderPieces = (pointIndex: number) => {
        const point = gameState.board[pointIndex];
        if (!point) return null;
        return Array.from({ length: point.count }).map((_, i) => (
            <Piece key={i} color={point.color} index={i} />
        ));
    };

    const renderPoint = (index: number) => {
        const isTop = index <= 12;

        const isLight = (isTop && index % 2 !== 0) || (!isTop && index % 2 === 0);

        return (
            <Point
                key={index}
                isTop={isTop}
                isLight={isLight}
                onClick={() => handlePointClick(index)}
                isSelected={selectedPoint === index}
                isPossibleMove={possibleMoves.includes(index)}
            >
                {renderPieces(index)}
            </Point>
        );
    };

    return (
        <BoardContainer>
            <HalfBoard>
                <PointRow>{[12, 11, 10, 9, 8, 7].map(renderPoint)}</PointRow>
                <PointRow>{[13, 14, 15, 16, 17, 18].map(renderPoint)}</PointRow>
            </HalfBoard>

            <Bar>
                {renderPieces(playerSymbol === 'w' ? 25 : 0)}
                {renderPieces(playerSymbol === 'w' ? 0 : 25)}
            </Bar>

            <HalfBoard>
                <PointRow>{[6, 5, 4, 3, 2, 1].map(renderPoint)}</PointRow>
                <PointRow>{[19, 20, 21, 22, 23, 24].map(renderPoint)}</PointRow>
            </HalfBoard>
        </BoardContainer>
    );
};

export default BackgammonBoard;