import { Router } from 'express';
import fs from 'fs';
import path from 'path';

export const readRouter = Router();

readRouter.get('/', (req, res) => {
    const index = parseInt(req.query.index as string, 10);

    if (isNaN(index)) {
        return res.status(400).send('Invalid index');
    }
    const dbPath = path.join(__dirname, '../../db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    if (index < 0 || index >= db.submissions.length) {
        return res.status(404).send('Submission not found');
    }

    const submission = db.submissions[index];
    console.log(submission)

    res.status(200).json(db.submissions[index]);
});
