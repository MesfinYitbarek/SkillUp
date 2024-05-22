import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import  questions ,{ answers} from "./data.js"; // Assuming data.js exports questions and answers

/** Get all questions */
export async function getQuestions(req, res) {
  try {
    const questionsData = await Questions.find();
    res.json(questionsData);
  } catch (error) {
    res.json({ error: error.message }); // Send specific error message
  }
}

/** Insert all questions (assuming data comes from data.js) */
export async function insertQuestions(req, res) {
  try {
    await Questions.insertMany({ questions, answers});
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error: error.message }); // Send specific error message
  }
}

/** Delete all questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error: error.message }); // Send specific error message
  }
}

/** Get all results */
export async function getResult(req, res) {
  try {
    const resultsData = await Results.find();
    res.json(resultsData);
  } catch (error) {
    res.json({ error: error.message }); // Send specific error message
  }
}

/** Store a new result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achieved } = req.body;

    // Basic validation
    if (!username || !result) {
      throw new Error("Username and Result are required!");
    }

    await Results.create({ username, result, attempts, points, achieved });
    res.json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.json({ error: error.message }); // Send specific error message
  }
}

/** Delete all results */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Results Deleted Successfully...!" });
  } catch (error) {
    res.json({ error: error.message }); // Send specific error message
  }
}
