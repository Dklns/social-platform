import express from 'express';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';
import likesRouter from './routes/likes.js';
import authRouter from './routes/auth.js';
import relationshipsRouter from './routes/relationships.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

app.use('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json('./upload/' + file.filename);
})
app.use('/api/user', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/auth', authRouter);
app.use('/api/relationships', relationshipsRouter);

app.listen(8800, () => {
    console.log('app is listening');
})