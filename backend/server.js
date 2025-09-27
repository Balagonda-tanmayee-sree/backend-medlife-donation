const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Donor = require("./models/Donor");
require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register donor
app.post("/donor/register", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ message: "Donor registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering donor" });
  }
});

// Search donors
app.get("/donor/search", async (req, res) => {
  const { bloodGroup, location } = req.query;
  try {
    const donors = await Donor.find({
      bloodGroup,
      location: { $regex: location, $options: "i" },
    });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: "Error searching donors" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
