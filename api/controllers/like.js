import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getLikes = (req, res) => {
    const query = 'select userId from likes where postId = ?';

    db.query(query, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    })
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');

        const query = 'insert into likes (`userId`,`postId`) values (?)';
        const values = [
            userInfo.id,
            req.body.postId
        ]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Post has been liked');
        })
    })
}

export const cancelLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');

        const query = 'delete from likes where `userId` = ? and `postId` = ?';

        db.query(query, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Like has been canceled');
        })
    })
}