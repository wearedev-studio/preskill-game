import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageContainer } from '../styles/StyledComponents';

const ProtectedRoute: React.FC = () => {
    const { user, isLoading } = useAuth();

    // 1. Если контекст еще в процессе загрузки данных из localStorage,
    // показываем заглушку "Загрузка...".
    if (isLoading) {
        return (
            <PageContainer>
                <h2>Загрузка...</h2>
            </PageContainer>
        );
    }

    // 2. Если загрузка завершена, и пользователя нет - перенаправляем на страницу входа.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. Если загрузка завершена, и пользователь есть - показываем запрошенную страницу.
    return <Outlet />;
};

export default ProtectedRoute;
