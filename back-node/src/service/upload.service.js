const { ref, uploadBytes } = require('firebase/storage');

const storage = require('../config/firebase.config.js');

/**
 * SERVICE: Upload file to firebase storage
 * @param file File object from request
 * @param folder Folder name
 * @returns {Promise<string>}
 */
const uploadFileToFirebase = async (file, folder) => {
    const time = new Date().getTime();
    const metadata = {
        contentType: file.mimetype,
    };
    const storageRef = ref(storage, `${folder || ''}/${time}-${file.originalname}`.replace(/ /g, '_'));
    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    return `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(snapshot.ref.fullPath)}?alt=media`;
}

module.exports = {
    uploadFileToFirebase
}