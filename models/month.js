const mongoose = require('mongoose');
const { Schema } = mongoose;

const monthSchema = new Schema({
  name: String,
  name_lower: String,
  year: Number,
  bookings: [String],
});

monthSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

Month = mongoose.model('Month', monthSchema);

module.exports = Month