import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const query = 'select * from users where id = ?';

    db.query(query, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json(info);
    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');

        const query = 'update users set `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? where id=?';

        db.query(query, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.profilePic,
            req.body.coverPic,
            userInfo.id
        ], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json('Updated!');
            return res.status(403).json('You can only update your profile');
        })
    })
}