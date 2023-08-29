import mongoose from "mongoose";
import Questions from "../models/Question.js";
// import schema with .js extension

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

  // console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    // console.log(_id);
    return res.status(400).send("Question unvailable...");
  }

  upUdateNoOfQuestions(_id, noOfAnswers);

  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log(error);
    // res.status(400).json(error);
  }
};

const upUdateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    // console.log(_id);
    return res.status(400).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    // console.log(_id);
    return res.status(400).send("Answer unavailable...");
  }

  
  upUdateNoOfQuestions(_id, noOfAnswers);
  try {
    await Questions.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );
    // In the given code snippet, the values for { _id } and { _id: answerId } represent the criteria used to identify the specific question and answer to be updated or deleted.

// In the case of { _id }, it typically refers to the unique identifier of a question. It is used to find and update the question with the specified _id.

// In the case of { _id: answerId }, it represents the criteria to identify the answer within the question that needs to be deleted. Here, _id refers to the unique identifier of the question, and answerId refers to the unique identifier of the answer within that question.

// To summarize, { _id } is the identifier for the question, and { _id: answerId } is the identifier for the specific answer within the question. The actual values for _id and answerId will be provided when calling the deleteAnswer function.
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};
