const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/WorkoutPlan');
const DietPlan = require('../models/DietPlan');
// const { protect } = require('../middleware/auth'); 

// Mock implementation of the Generators

// @route   POST /api/coach/generate/fat-loss
router.post('/generate/fat-loss', async (req, res) => {
  try {
    const { userId, level } = req.body;
    // Mock response guided by Trainer Biswajit Das
    const plan = {
      user: userId,
      goal: 'fat_loss',
      type: 'hiit',
      difficulty: level || 'intermediate',
      title: 'Biswajit Das Fat Loss Program',
      days: [
        { day: 'monday', name: 'Cardio & Core', exercises: [{name: 'Jumping Jacks', sets: 4, reps: '45 sec'}] },
        { day: 'tuesday', name: 'Lower Body Fat Burn', exercises: [{name: 'Squats', sets: 4, reps: '20'}] },
        { day: 'wednesday', isRestDay: true, name: 'Active Recovery' },
        { day: 'thursday', name: 'Upper Body HIIT', exercises: [{name: 'Pushups', sets: 4, reps: '15'}] },
        { day: 'friday', name: 'Full Body Circuit', exercises: [{name: 'Mountain Climbers', sets: 4, reps: '60 sec'}] },
      ]
    };
    res.json({ message: 'Plan Generated', plan });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   POST /api/coach/generate/muscle-building
router.post('/generate/muscle-building', async (req, res) => {
  try {
    const { userId, level } = req.body;
    // Mock response guided by Coach Satyajit Nayak
    const plan = {
      user: userId,
      goal: 'muscle_gain',
      type: 'strength',
      difficulty: level || 'advanced',
      title: 'Satyajit Nayak PPL Hypertrophy',
      days: [
        { day: 'monday', name: 'Push (Chest, Shoulders, Triceps)', exercises: [{name: 'Bench Press', sets: 4, reps: '8-10'}] },
        { day: 'tuesday', name: 'Pull (Back, Biceps)', exercises: [{name: 'Pull-ups', sets: 4, reps: '8-10'}] },
        { day: 'wednesday', name: 'Legs (Quads, Hams, Calves)', exercises: [{name: 'Squats', sets: 4, reps: '8-10'}] },
      ]
    };
    res.json({ message: 'Plan Generated', plan });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   POST /api/coach/generate/personalized
router.post('/generate/personalized', async (req, res) => {
  try {
    const { userId, height, weight, age, gender, goal, equipment } = req.body;
    
    // In reality this would call an AI API like OpenAI to generate JSON
    const plan = {
      user: userId,
      title: 'AI Personalized Journey',
      goal,
      type: 'custom',
      difficulty: 'intermediate',
      days: [
        { day: 'monday', name: 'Custom Day 1', exercises: [{name: equipment === 'none' ? 'Pushups' : 'Dumbbell Press', sets: 3, reps: '10'}] }
      ]
    };
    
    const nutrition = {
      user: userId,
      title: 'AI Nutrition Plan',
      goal,
      dailyCalories: 2200,
      macros: { protein: 160, carbs: 200, fats: 65 },
      meals: [
        { type: 'breakfast', time: '08:00', name: 'Oats & Eggs', calories: 400, foods: [{name:'Oats', quantity:'50g'}] },
        { type: 'lunch', time: '13:00', name: 'Chicken & Rice', calories: 600, foods: [{name:'Chicken Breast', quantity:'200g'}] }
      ]
    };

    res.json({ message: 'Plans Generated', plan, nutrition });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
