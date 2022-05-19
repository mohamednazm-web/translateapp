const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String
  },
  quizType: { type: String },
  a1: {
    a: { type: String },
    i: { type: Number }
  },
  a2: {
    a: { type: String },
    i: { type: Number }
  },
  a3: {
    a: { type: String },
    i: { type: Number }
  },
  a4: {
    a: { type: String },
    i: { type: Number }
  }
});

const Quizes = mongoose.model('Quizes', quizSchema);

module.exports = Quizes;
