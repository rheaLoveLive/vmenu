import multer from "multer";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req, res) => {
  const { folderName, filename } = req.body;

  try {
    //   direktori
    const uploadDir = path.join(process.cwd(), `public/uploads/${folderName}`);

    //  cek jika direktori ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdir(uploadDir, { recursive: true });
    }

    // config upload
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        cb(null, filename);
      },
    });

    const upload = multer({ storage });

    upload.single("file")(req, res, (err) => {
      if (err) {
        return res
          .status(401)
          .json({ error: `File upload error: ${err.message}` });
      }
      res.status(200).json({
        message: "File uploaded successfully",
        filename: req.file.filename,
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: `ada kesalahan tak terduga (${err})`,
    });
  }
};

export default handler;
