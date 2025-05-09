import multer, { diskStorage } from "multer";
import path from "path";

const storage = diskStorage({
  destination: (req, file, cb) => {
    console.log(path.join(__dirname, "uploaded-music"));
    cb(null, path.join(__dirname, "uploaded-music"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".mp3");
  },
});
const music_multer = multer({
  storage,
});

export default music_multer;
