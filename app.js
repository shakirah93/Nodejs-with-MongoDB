const mongoose = require("mongoose");
require("dotenv").config();

// connect to the database
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.nkupy.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a schema for your data
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const db = mongoose.connection;

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", async () => {
  console.log("Database connected successfully");
});

// Create a model from the schema
const Person = mongoose.model("Person", personSchema);

// get all data from the Person collection
async function showAllPersons() {
  const persons = await Person.find({}).limit(2);

  // to sort by name (1 for ascending, -1 for descending)
  //const persons = await Person.find().sort({ name: 1 }); // sort by name(ascending order)

  console.log("Result : " + persons);
}

showAllPersons();

// create new Person
async function createNewPerson() {
  try {
    const person = await Person.create({ name: "John Doe", age: 22 });
    console.log("New person created successfully" + person);
  } catch (err) {
    console.error(err);
  }
}

// createNewPerson();

// delete data from the Person collection
async function deletePerson() {
  try {
    const person = await Person.deleteOne({ name: "John" });
    console.log("Data deleted successfully" + person);
  } catch (err) {
    console.error(err);
  }
}

//deletePerson();

// update existing data in the Person collection
async function updatePerson() {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: "65b4ee393bcb152ee6e357c3" }, // find the ID
      { name: "John" },
      { new: true } // return the updated data
    );

    console.log("Data updated successfully" + updatedPerson);
  } catch (err) {
    console.error(err);
  }
}

// updatePerson();

// showing person with specific requirements
// gt for greater than, lt for less than
async function showSpecificPerson() {
  try {
    // const persons = await Person.find({ age: { $lt: 30 } });
    const persons = await Person.find({
      $or: [{ name: "John" }, { age: { $gt: 30 } }],
    });

    console.log("Result : " + persons);
  } catch (err) {
    console.error(err);
  }
}

// showSpecificPerson();
