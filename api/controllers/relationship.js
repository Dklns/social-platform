import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getRelationships = (req, res) => {
    const query = 'select followerUserId from relationships where followedUserId = ?';

    db.query(query, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    })
}

export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');

        const query = 'insert into relationships (`followerUserId`,`followedUserID`) values (?)';
        const values = [
            userInfo.id,
            req.body.userId
        ]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Following');
        })
    })
}

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in');

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');

        const query = 'delete from relationships where `followerUserId` = ? and `followedUserId` = ?';

        db.query(query, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Cancel follow');
        })
    })
}