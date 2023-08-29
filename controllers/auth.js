// import { JsonWebTokenError from "jsonwebtoken";
import jwt from "jsonwebtoken";
// jwt :-header algorithm
//payload data
//signature

// What is a typical authentication flow using JWT?
// User credentials sent to /signin
// /signin returns a JWT (signed with a key)
// JWT is stored in localStorage
// JWT is sent on every request (to API)
// The server can read the JWT and extract user ID out of it
// Jwt contains the encoded form of the algorithm.data.signature and so if the user tries to fiddle with the user ID or any other data held in the jwt, then the jwt signature becomes invalid.

// Jwt is encoded (not encrypted), so any one can read the data component of the jwt (see jwt.io for example). Therefore it is recommended not to store any secrets like password in the jwt.

// It is also recommended to use an encrypted connection (SSL/TLS) when making the web request that contains the jwt because otherwise an attacker can steal the jwt and use it to impersonate you.

import users from "../models/auth.js";
import bcrypt from "bcryptjs";
// What is bcrypt JS used for?
// bcrypt allows building a password security platform that can evolve alongside hardware technology to guard against the threats that the future may bring, such as attackers having the computing power to crack passwords twice as fast.

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("It's request body....", req.body);
  try {
    const exstinguser = await users.findOne({ email });
    if (exstinguser) {
      return res.status(400).json({ message: "User already exist..." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    // id: exstinguser._id it will create by mongodb

    res.status(200).json({ result: newUser, token });
    // What is JSON Web Token? JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

    // For authentication

    // It takes your email and user id combine it with a jwt secret password (which is test in your case) then apply a condition on it that it'll get expired after one hour of creation
    // After doing this it returns a string (json web token) which we can use to identify the user through a middleware (you will make it in upcoming lectures)
  } catch (error) {
    res.status(500).json("Something went wronggggg.......");
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exstinguser = await users.findOne({ email });
    if (!exstinguser) {
      return res.status(404).json({ message: "User don't exist..." });
    }

    const isPassCrt = await bcrypt.compare(password, exstinguser.password);
    if (!isPassCrt) {
      return res.status(400).json({ message: "Invalid creditial..." });
    }
    const token = jwt.sign(
      // JWT then uses the sign() method to create a JSON Web Token for that user and returns the token in the form of a JSON string.
      { email: exstinguser.email, id: exstinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    // id: exstinguser._id it will create by mongodb
    res.status(200).json({ result: exstinguser, token });
    // JWT then uses the sign() method to create a JSON Web Token for that user and returns the token in the form of a JSON string.

    // JWTs are mainly used for authentication. After a user signs in to an application, the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. This token tells the server what routes, services, and resources the user is allowed to access.
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};
