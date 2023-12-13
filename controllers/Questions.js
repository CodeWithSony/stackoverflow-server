import Question from "../models/Question.js";
// above imported Question is question schema
import mongoose from "mongoose";

export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Question(postQuestionData);
  //   userId: the id of the particular user who has posted this question. and this is coming from the mongodb

  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully...");
  } catch (error) {
    console.log(error);
    res.status(404).json("Couldn't post a new question...");
  }
};

export const getAllQuestions = async (req, res) => {
  // console.log("question")
  try {
    const questionList = await Question.find().sort({ askedOn: -1 });
    // we are putting all data from the question schema to the questionlist.
    res.status(200).json(questionList);
    // we will send this data to the client
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// we are gonna retrive data from the database which is questionDetails object so we are making async function here

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    await Question.findByIdAndRemove(_id);
    return res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//vote question
export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const question = await Question.findById(_id);
    const upIndex = question.upVotes.findIndex((id) => id === String(userId));
    const downIndex = question.downVotes.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVotes = question.downVotes.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVotes.push(userId);
      } else {
        question.upVotes = question.upVotes.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVotes = question.upVotes.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVotes.push(userId);
      } else {
        question.downVotes = question.downVotes.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Question.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully..." });
  } catch (error) {
    // res.status(404).json({ message: "id not found" });
    console.log(error);
  }
};
