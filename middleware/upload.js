import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/assets/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
        // cb(null, Date.now() + '-' + file.filename + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            callback(null, true)
        } else {
            console.log('Only validated formats, please!')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    
});

export default upload