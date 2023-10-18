const { uploadFileToFirebase } = require('../service/upload.service.js');

/**
 * CONTROLLER: Upload avatar to firebase storage
 *
 * PATH: POST /api/upload/avatar
 *
 * @param req
 * @param res
 * @returns response status 200 with url of avatar, or status 400 with error message
 */
const uploadAvatar = async (req, res) => {
    if(req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }
    try {
        const url = await uploadFileToFirebase(req.file, 'avatar');
        res.status(200).json({ url });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    uploadAvatar
}