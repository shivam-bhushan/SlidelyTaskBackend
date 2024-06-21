import { Router } from 'express';
import fs from 'fs';
import path from 'path';

export const submitRouter = Router();

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: number;
}

submitRouter.post('/', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    // Log the body of the request
    console.log('Received submission:', req.body);

    if (!name || !email || !phone || !github_link) {
        return res.status(400).send('Missing required fields');
    }

    const dbPath = path.join(__dirname, '../../db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    db.submissions.push({ name, email, phone, github_link, stopwatch_time });

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).send('Submission saved');
});
