import API from './index'; // Наш настроенный экземпляр axios

/**
 * Загружает новый файл аватара на сервер.
 * @param formData - Объект FormData, содержащий файл.
 */
export const updateAvatar = async (formData: FormData) => {
    const { data } = await API.put('/users/profile/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

/**
 * Отправляет старый и новый пароли для смены.
 * @param passwordData - Объект с полями oldPassword и newPassword.
 */
export const updatePassword = async (passwordData: any) => {
    const { data } = await API.put('/users/profile/password', passwordData);
    return data;
};