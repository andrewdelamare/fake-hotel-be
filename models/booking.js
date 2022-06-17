const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  firstName: String,
  lastName: String,
  people: Number,
  nights: Number,
  dates: [Date],
  roomId: String,
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
