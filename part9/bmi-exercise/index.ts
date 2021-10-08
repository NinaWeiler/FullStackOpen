import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if(!req.query.height || !req.query.weight || isNaN(Number(req.query.height || isNaN(Number(req.query.height))))) {
        res.status(400).json({ error: 'malformatted parameters'})
    } else {
        const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight))
        res.json({
            weight: Number(req.query.height),
            height: Number(req.query.weight),
            bmi: bmi
        })
    }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});