const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const todoModel = require("../models/todoModel"); // Import your model

router.use(bodyParser.urlencoded({ extended: true }));

// Display the list of items
router.get("/", async (req, res) => {
  try {
    const items = await todoModel.find({});

    // Filter out items with missing or empty names
    const validItems = items.filter(
      (item) => item.name && item.name.trim() !== ""
    );

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const today = new Date();
    const day = today.toLocaleDateString("en-US", options);

    res.render("list", { KindOfDay: day, newListItems: validItems });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Create and save a new item
router.post("/", async (req, res) => {
  const newItemText = req.body.newItem;
  const newItem = new todoModel({
    name: newItemText,
  });

  try {
    await newItem.save();
    console.log("New item saved to the database");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
