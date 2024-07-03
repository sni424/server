const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

// CORS 설정 추가

app.use(
  cors({
    origin: "http://localhost:5173", // 프론트엔드 주소
  })
);
// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "files")); // 파일이 저장될 경로 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 파일명 설정
  },
});
const upload = multer({ storage: storage });

// 정적 파일 제공 설정
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// 파일 업로드 처리 라우트
app.post("/upload", upload.array("file", 10), (req, res) => {
  console.log(req.files);
  res.status(200).json({ success: true });
});
// 서버 시작
app.listen(5174, () => {
  console.log("Server is running on port 3000");
});
