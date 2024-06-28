const Workout = require("../schema/workout");
const mongoose = require("mongoose");
const OpenAI = require('openai');
require('dotenv').config();

// get all
const getAll = async (req, res) => {
  try {
    const user = req.user._id;
    let workouts = await Workout.find({ user }).sort({ date: -1 });

    if (!workouts) {
      return res.status(404).json({ message: "No workouts found" });
    } else {
      res.status(200).json(workouts);
    }
  } catch (err) {
    console.log("Error getting workouts", err);
    res.status(500).json({ message: "Server error" });
  }
};

// get one
const getOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout" });
  }
  try {
    let workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "No workout found" });
    } else {
      res.status(200).json(workout);
    }
  } catch (err) {
    console.log("Error getting workouts", err);
    res.status(500).json({ message: "Server error" });
  }
};
// post an activity
const postActivity = async (req, res) => {
  const { title, cost, startDate, type,source } = req.body;
  const user = req.user._id;
  try {
    const workout = await Workout.create({
      title,
      cost,
      user,
      date: startDate,
      type,
      source
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.deleteOne({ _id: id });
    if (!workout) {
      return res.status(404).json("Workout not found");
    } else {
      res.status(200).json("Deleted the workout");
    }
  } catch {
    res.status(500).send("server error");
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res.status(404).json("Workout not found");
    } else {
      res.status(200).json(workout);
    }
  } catch {
    res.status(500).send("server error");
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const getUserWorkouts = async (userId) => {
  try {
    return await Workout.find({ user: userId }).sort({ createdAt: -1 });
  } catch (err) {
    console.log("Error getting workouts", err);
    throw err;
  }
};

const ai = async (req, res) => {
  const { query } = req.body;
  try {
    const user = req.user._id;
    const userExpenses = await getUserWorkouts(user);
    const formattedExpenses = userExpenses.map(expense => {
      return `${expense.type} of ${expense.cost} rupees for ${expense.title} on ${expense.date}`;
    });

    const prompt = `From the below Expense data what is ${query}\n\nExpense data: ${JSON.stringify(
      formattedExpenses
    )}, summarize if possible based on all the data mentioned in Expense data, check date properly. I there is no data on specified data, tell no data available`;


    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });
    const answer = response.choices[0].message.content;

    res.json({ answer });
  } catch (error) {
    console.error("Error processing AI query:", error.message);
    res.status(500).json({ error: "Failed to process query" });
  }
};

module.exports = {
  postActivity,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  ai,
};
