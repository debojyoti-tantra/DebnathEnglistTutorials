require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using credentials from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Define the schema
const FathersHelpfeedbackSchema = new mongoose.Schema({
  name: String,
  feedback: String,
  submittedAt: { type: Date, default: Date.now }
});

// Create a model for the FathersHelpFeedback collection
const FathersHelpFeedback = mongoose.model('FathersHelpFeedback', FathersHelpfeedbackSchema);

app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('Home')
  // res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.render('about')
  // res.send('Hello World!')
})

app.get('/payment', (req, res) => {
  res.render('payment')
  // res.send('Hello World!')
})

app.get('/class-10', (req, res) => {
  res.render('class-10')
  // res.send('Hello World!')
})

app.get('/class-10/:slug', (req, res) => {
  res.render(`${req.params.slug}`)
  // res.send(`${req.params.slug} page is on Progress.......`)
})

app.post('/class-10/FathersHelp/submit', async (req, res) => {
  // Create a new feedback document
  const FathersHelpfeedbackData = new FathersHelpFeedback({
    name: req.body.name,
    feedback: req.body.feedback
  });

  // Save the document to the collection
  await FathersHelpfeedbackData.save();

  // Render the success page with the submitted data
  res.render('success', {
    name: req.body.name,
    feedback: req.body.feedback
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})