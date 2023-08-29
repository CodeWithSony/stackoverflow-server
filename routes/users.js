import express from "express";
import { signup, login } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";
// import auth from '../middlewares/Auth'
// import auth from "../middlewares/auth.js";
import Auth from "../middlewares/Auth.js";

// controller is just a simple function here
// Which is taking req and res as parameters
// And completing the user request and sending back the response based of some conditions or operations

// In case of sign up controller
// It'll take req res
// Extract user details like user name email and password
// Create user then send response as new profile

const router = express.Router();
// React Router is a JavaScript framework that lets us handle client and server-side routing in React applications. It enables the creation of single-page web or mobile apps that allow navigating without refreshing the page. It also allows us to use browser history features while preserving the right application view
router.post("/signup", signup);
router.post("/login", login);
// "/" it's for users and callback is for Auth controller's auth...

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", Auth, updateProfile);
export default router;
