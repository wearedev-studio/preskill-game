import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { PageContainer, StyledButton, StyledInput } from '../../styles/StyledComponents';
import { updateAvatar, updatePassword } from '../../api/userService';

// --- Стили ---
const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
`;

const SettingsCard = styled.div`
  padding: 2rem;
  background-color: var(--dark-surface);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const Message = styled.p<{ type: 'success' | 'error' }>`
  color: ${props => props.type === 'success' ? '#4caf50' : '#ff6b6b'};
  text-align: center;
  font-weight: bold;
  min-height: 24px;
  margin-top: 1rem;
`;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 1.5rem;
  &:hover > div {
    opacity: 1;
  }
`;

const AvatarPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--primary-color);
  object-fit: cover;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  font-weight: bold;
`;


// --- Основной компонент ---
const SettingsPage: React.FC = () => {
    const { user, login } = useAuth();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            const data = await updateAvatar(formData);
            if (user) {
                const updatedUser = { ...user, avatar: data.avatar };
                login(updatedUser);
            }
            setMessage({ text: data.message, type: 'success' });
        } catch (err: any) {
            setMessage({ text: err.response?.data?.message || 'Ошибка загрузки', type: 'error' });
        }
    };
    
    // --- НАЧАЛО ИСПРАВЛЕНИЙ ---
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setMessage(null);

        if (newPassword.length < 6) {
            setMessage({ text: 'Новый пароль должен быть не менее 6 символов', type: 'error' });
            return;
        }

        // Оборачиваем запрос в try...catch для обработки ошибок
        try {
            const data = await updatePassword({ oldPassword, newPassword });
            setMessage({ text: data.message, type: 'success' });
            setOldPassword('');
            setNewPassword('');
        } catch (err: any) {
            // Если сервер вернул ошибку (например, 401 - неверный старый пароль), показываем ее
            setMessage({ text: err.response?.data?.message || 'Ошибка смены пароля', type: 'error' });
        }
    };
    // --- КОНЕЦ ИСПРАВЛЕНИЙ ---
    
    if (!user) {
        return <PageContainer><h2>Загрузка...</h2></PageContainer>;
    }

    return (
        <PageContainer>
            <SettingsLayout>
                <SettingsCard>
                    <Title>Сменить аватар</Title>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                    <AvatarContainer onClick={handleAvatarClick}>
                        <AvatarPreview src={user.avatar} alt="Ваш аватар" />
                        <AvatarOverlay>Сменить</AvatarOverlay>
                    </AvatarContainer>
                    <p style={{color: 'var(--dark-text)', fontSize: '0.9rem'}}>Нажмите на аватар, чтобы изменить его</p>
                </SettingsCard>

                <SettingsCard>
                    <Title>Сменить пароль</Title>
                    <Form onSubmit={handlePasswordSubmit}>
                        <StyledInput type="password" placeholder="Старый пароль" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                        <StyledInput type="password" placeholder="Новый пароль" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        <StyledButton type="submit">Обновить пароль</StyledButton>
                    </Form>
                </SettingsCard>
                
                {message && <Message type={message.type}>{message.text}</Message>}
            </SettingsLayout>
        </PageContainer>
    );
};

export default SettingsPage;