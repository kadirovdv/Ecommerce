import express from "express";
import multer from "multer";
import path from "path"

const router = express.Router();

const storage = multer.diskStorage({
    destination(request, file, cb) {
        cb(null, "uploads/");
    },
    filename(request, file, cb) {
        cb(null, `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}` )
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if(extname && mimeType) {
        return cb(null, true);
    } else {
        cb("Image only!");
    }
}

const upload = multer({
    storage,
    fileFilter: function (request, file, cb) {
        checkFileType(file, cb)
    }
})

router.post("/", upload.single("image"), (request, response) => {
    response.send(`/${request.file.path}`)
})

export default router