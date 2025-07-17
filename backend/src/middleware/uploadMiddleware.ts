import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Убедимся, что папка для загрузок существует
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Настраиваем хранилище для multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Указываем папку, куда сохранять файлы
    },
    filename: (req, file, cb) => {
        // Создаем уникальное имя файла, чтобы избежать конфликтов
        // Например: user_id-timestamp.jpg
        // @ts-ignore
        const userId = req.user?.id || 'guest';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${userId}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Фильтр файлов, чтобы разрешать только изображения
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Неверный тип файла, разрешены только изображения!'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Ограничение размера файла в 5MB
    }
});