const mongoose = require('mongoose');
const { Schema } = mongoose;

//Status options:
// -Reserved
// -Paid
// -CheckedIn
// -CheckedOut
// -Canceled 

const bookingSchema = new Schema({
  name: String,
  people: Number,
  nights: Number,
  dates: [String],
  roomId: String,
  status: String,
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking