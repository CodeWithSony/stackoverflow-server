import mongoose from "mongoose";
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

const userSchema = mongoose.Schema({
    // A Mongoose Schema defines the structure and property of the document in the MongoDB collection. This Schema is a way to define expected properties and values along with the constraints(pratibandh) and indexes.
    name : {type: String, required: true},
    email : {type: String, required: true},

    password : {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    JoinedOn: {type: Date, default: Date.now}

})

export default mongoose.model("User", userSchema)
// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.


// we are creating schema for our user's database


// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.