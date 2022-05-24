import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookingSchema = new Schema({
  name: String,
  people: String,
  nights: Number,
  dates: [Date],
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Booking = mongoose.model('Booking', bookingSchema);