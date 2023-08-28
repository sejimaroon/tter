const express = require('express');
const app = express();
const PORT = 3300;
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs'); 

const defaultIcon = "/path/to/src/assets/logo192.png";

app.use(express.json());
app.use(express.static("./dist"));
app.use('/uploads', express.static('uploads'));

const userDatabase = {}; // users オブジェクトは不要なため削除

app.post('/signup', (req, res) => {
  const { email, name, password } = req.body;

  userDatabase[email] = { email, name, password, iconUrl: defaultIcon, token: null };
  res.json({ message: 'アカウントが正常に作成されました。' });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!userDatabase[email] || userDatabase[email].password !== password) {
    res.status(401).json({ error: '認証情報が正しくありません。' });
    return;
  }

  const token = jwt.sign({ email, name: userDatabase[email].name }, 'your-secret-key', { expiresIn: '1h' });
  userDatabase[email].token = token;
  res.json({ message: 'ログインに成功しました。', token });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  },
});

const upload = multer({ storage: storage });

app.post('/uploads', upload.single('icon'), (req, res) => {
  const userToken = req.headers.authorization;

  try {
    jwt.verify(userToken, 'your-secret-key');

    const newFileName = req.file.filename;
    const oldFilePath = path.join(__dirname, 'uploads', req.file.filename);
    const newFilePath = path.join(__dirname, 'uploads', newFileName);
    fs.renameSync(oldFilePath, newFilePath);

    if (userDatabase[userToken]) {
      userDatabase[userToken].iconUrl = newFileName;
    }

    res.json({ message: 'プロフィール画像がアップロードされました。' });
  } catch (error) {
    res.status(401).json({ error: 'トークンが無効です。' });
  }
});

// サーバー側のapp.put('/setting', ...)ルートの修正
app.put('/setting', upload.single('icon'), (req, res) => {
  const { name } = req.body; // Get the name from the form data
  const userToken = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(userToken, 'your-secret-key');

    if (userDatabase[decodedToken.email]) {
      const user = userDatabase[decodedToken.email];
      user.name = name;

      // Update the user's icon only if a new icon was provided
      if (req.file) {
        const newFileName = req.file.filename;
        const oldFilePath = path.join(__dirname, 'uploads', req.file.filename);
        const newFilePath = path.join(__dirname, 'uploads', newFileName);
        fs.renameSync(oldFilePath, newFilePath);
        user.iconUrl = newFileName;
      }

      // Generate a new token with updated payload
      const newToken = jwt.sign({ name: user.name, iconUrl: user.iconUrl }, 'your-secret-key', { expiresIn: '1h' });
      user.token = newToken;

      res.json({ message: 'ユーザー情報が更新されました。', token: newToken, iconUrl: user.iconUrl, name: user.name });
    } else {
      res.status(401).json({ error: 'ユーザーが見つかりません。' });
    }
  } catch (err) {
    res.status(401).json({ error: 'トークンが無効です。' });
  }
});

app.get("/user/icon", (req, res) => {
  // Assuming you have the user's token or identifier, find the user in the users array
  // and send their iconUrl
  const userToken = req.headers.authorization;
  const user = userDatabase.find(user => user.token === userToken);
  if (user) {
    res.json({ iconUrl: user.iconUrl });
  } else {
    res.status(401).json({ error: 'ユーザーが見つかりません。' });
  }
});

app.get("/user/name", (req, res) => {
  // Assuming you have the user's token or identifier, find the user in the users array
  // and send their name
  const userToken = req.headers.authorization;
  const user = userDatabase.find(user => user.token === userToken);
  if (user) {
    res.json({ username: user.name });
  } else {
    res.status(401).json({ error: 'ユーザーが見つかりません。' });
  }
});

app.get("*", (req, res) => {
  // Generate the client-side HTML
  const html = `
    <html>
    <head>
      <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin">
      <meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp">
    </head>
    <body>
      <div id="root"></div>
      <script src="/client.bundle.js"></script>
    </body>
    </html>
  `;

  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました。`);
});
