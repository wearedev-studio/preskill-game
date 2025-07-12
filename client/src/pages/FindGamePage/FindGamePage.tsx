import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { socket } from '../../socket';
import { PageContainer } from '../../styles/StyledComponents';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const FindGamePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login');

            return;
        }

        const gameType = location.state?.gameType || 'tic-tac-toe';

        const onGameFound = ({ gameId }: { gameId: string }) => {
            navigate(`/game/${gameId}`);
        };

        socket.on('gameFound', onGameFound);
        
        socket.emit('findGame', { user, gameType });

        return () => {
            socket.off('gameFound', onGameFound);

            socket.emit('cancelFindGame');
        };
    }, []);

    return (
        <PageContainer>
            <Spinner />
            <h2 style={{ marginTop: '1.5rem' }}>Поиск оппонента...</h2>
        </PageContainer>
    );
};

export default FindGamePage;