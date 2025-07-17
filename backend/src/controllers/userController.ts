import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

// @ts-ignore
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    }
}

// GET /api/users/profile
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id).select('-passwordHash');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// PUT /api/users/profile
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.avatar = req.body.avatar || user.avatar;
            
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                balance: updatedUser.balance,
            });
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// --- НАЧАЛО НОВОГО КОДА ---

/**
 * @desc    Обновить аватар пользователя
 * @route   PUT /api/users/profile/avatar
 * @access  Private
 */
export const updateUserAvatar = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Файл аватара не был загружен' });
        }

        const user = await User.findById(req.user?.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        
        // Формируем полный URL для аватара
        const avatarUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;

        // Сохраняем в базу данных ПОЛНЫЙ URL
        user.avatar = avatarUrl;
        
        await user.save();

        res.status(200).json({ 
            message: 'Аватар успешно обновлен', 
            avatar: user.avatar // Возвращаем полный URL
        });

    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при обновлении аватара' });
    }
};


/**
 * @desc    Изменить пароль авторизованного пользователя
 * @route   PUT /api/users/profile/password
 * @access  Private
 */
export const updateUserPassword = async (req: AuthenticatedRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Пожалуйста, укажите старый и новый пароль' });
    }

    try {
        // Находим пользователя и явно запрашиваем хэш пароля
        const user = await User.findById(req.user?.id).select('+passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверяем, совпадает ли старый пароль с тем, что в базе
        const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Неверный старый пароль' });
        }

        // Хешируем и сохраняем новый пароль
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();
        
        res.status(200).json({ message: 'Пароль успешно изменен' });

    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при смене пароля' });
    }
};
// --- КОНЕЦ НОВОГО КОДА ---