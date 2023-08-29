import express from 'express';

import {postAnswer, deleteAnswer} from '../controllers/Answers.js';
import auth from '../middlewares/Auth.js'

const router = express.Router();
router.patch('/post/:id', auth, postAnswer);
router.patch('/delete/:id', auth, deleteAnswer);
//patch is used to update particular data in the database. we do have answer array in the database now we have to update it will values.

// How patch works in mern stack

// ChatGPT
// In the MERN stack, the "patch" operation refers to updating a specific resource or document on the server. It involves sending a partial representation of the resource containing only the fields that need to be updated, rather than sending the entire resource.

// Here's a step-by-step explanation of how the patch operation works in the MERN stack:

// Client sends a PATCH request: The client application initiates a PATCH request to the server, specifying the resource's endpoint (URL) and the specific document or item to update.

// Server receives the request: The server, built with Node.js and Express.js, receives the PATCH request.

// Data validation and authorization: The server performs any necessary data validation and authorization checks to ensure that the user has the required permissions to modify the resource.

// Partial update: The server extracts the data from the PATCH request's body, which typically contains a JSON object. This JSON object contains only the fields that need to be updated and their new values.

// Update the resource: Using a database management system like MongoDB, the server retrieves the existing resource or document and applies the changes specified in the PATCH request.

// Save the updated resource: The server saves the modified resource back to the database, reflecting the changes made in the previous step.

// Response to the client: The server sends an HTTP response back to the client, indicating the status of the PATCH operation. It may include the updated resource or relevant information about the update.

// Overall, the patch operation allows for efficient updates by only sending the modified fields rather than the entire resource. This can reduce network traffic and improve performance, especially when dealing with large datasets or resources with numerous fields.
export default router
