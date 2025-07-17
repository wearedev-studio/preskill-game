import { Router } from 'express';
import {
    getUserProfile,
    updateUserProfile,
    updateUserAvatar,
    updateUserPassword
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware'; // <-- Импортируем наш upload middleware


const router = Router();

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Отдельный маршрут для обновления аватара
router.put('/profile/avatar', protect, upload.single('avatar'), updateUserAvatar);

// Отдельный маршрут для смены пароля
router.put('/profile/password', protect, updateUserPassword);

export default router;