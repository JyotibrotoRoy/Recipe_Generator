import { predictCategory } from '../models/modelLoader.js';

export async function handlePrediction(req, res) {
  try {
    const { ingredients } = req.body;
    if (!ingredients) return res.status(400).json({ error: 'Ingredients required' });

    const result = await predictCategory(ingredients);
    res.json(result);
  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
}
