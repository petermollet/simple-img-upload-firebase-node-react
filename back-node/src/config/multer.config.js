const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.mimetype)) {
            req.fileValidationError = "Unsupported file type";
            return cb(null, false, req.fileValidationError);
        }
        cb(null, true);
    }
});

module.exports = upload;
