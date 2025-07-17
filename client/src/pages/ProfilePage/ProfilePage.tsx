import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { PageContainer, StyledButton } from '../../styles/StyledComponents';

// --- Стили ---
const ProfileCard = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  background-color: var(--dark-surface);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--primary-color);
  object-fit: cover;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const UserName = styled.h2`
  font-size: 1.8rem;
  color: var(--light-text);
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: var(--dark-text);
`;

const UserBalance = styled.p`
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: bold;
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const SecondaryButton = styled(StyledButton)`
  background-color: var(--dark-surface);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  &:hover {
    background-color: rgba(97, 218, 251, 0.1);
  }
`;

const GameSelection = styled.div`
  width: 100%;
  margin-top: 2rem;
  border-top: 1px solid #444;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameCard = styled.div`
  background-color: var(--dark-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--dark-surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameTitle = styled.h3`
  font-size: 1.2rem;
`;

// --- Основной компонент ---
const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePlayOnline = (gameType: 'tic-tac-toe' | 'checkers' | 'backgammon' | 'chess') => {
        navigate('/find-game', { state: { gameType } });
    };

    const handlePlayOffline = (gameType: 'tic-tac-toe' | 'checkers' | 'backgammon') => {
        navigate(`/offline-game/${gameType}`);
    };

    if (!user) {
        return <PageContainer><p>Загрузка профиля...</p></PageContainer>;
    }

    return (
        <PageContainer>
            <ProfileCard>
                <ProfileAvatar src={user.avatar} alt={`Аватар ${user.username}`} />
                <ProfileDetails>
                    <UserName>{user.username}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                    <UserBalance>Баланс: {user.balance} 💰</UserBalance>
                </ProfileDetails>
                
                <GameSelection>
                    <GameCard>
                        <GameTitle>Крестики-нолики</GameTitle>
                        <ButtonGroup>
                            <StyledButton onClick={() => handlePlayOnline('tic-tac-toe')}>Онлайн</StyledButton>
                        </ButtonGroup>
                    </GameCard>
                    <GameCard>
                        <GameTitle>Шашки</GameTitle>
                         <ButtonGroup>
                            <StyledButton onClick={() => handlePlayOnline('checkers')}>Онлайн</StyledButton>
                        </ButtonGroup>
                    </GameCard>
                    <GameCard>
                        <GameTitle>Нарды</GameTitle>
                        <ButtonGroup>
                            <StyledButton onClick={() => handlePlayOnline('backgammon')}>Онлайн</StyledButton>
                        </ButtonGroup>
                    </GameCard>
                    <GameCard>
                        <GameTitle>Шахматы</GameTitle>
                        <ButtonGroup>
                            <StyledButton onClick={() => handlePlayOnline('chess')}>Онлайн</StyledButton>
                        </ButtonGroup>
                    </GameCard>
                </GameSelection>
            </ProfileCard>
        </PageContainer>
    );
};

export default ProfilePage;