import multer from "multer";
import { join, extname } from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, join(__dirname, "files"));
  },
  filename(req: any, file, callback) {
    const fileName = Date.now() + extname(file.originalname);
    callback(null, fileName);
  },
});

const sendFiles = multer({ storage });
export default sendFiles;
