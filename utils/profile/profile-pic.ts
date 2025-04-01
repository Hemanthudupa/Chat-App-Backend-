import multer, { diskStorage, DiskStorageOptions } from "multer";
import path from "path";
const storage = diskStorage({
  destination: path.join(__dirname, "..", "profile-pictures"),
  filename(req: any, file: any, callback) {
    let fileName = Date.now() + "" + path.extname(file.originalname);

    file.filename = fileName;
    callback(null, fileName);
  },
});
const profile = multer({ storage: storage });

export default profile;
