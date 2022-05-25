const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
  description: String,
  maxOccupants: Number,
  beds: Number,
  bookings: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
],
});

roomSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

Room = mongoose.model('Room', roomSchema);

module.exports = Room