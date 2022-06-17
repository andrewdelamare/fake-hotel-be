const express = require("express");
const Booking = require("../models/booking");
const bookingRouter = express.Router();

bookingRouter.get("/bookings", async (req, res) => {
  const bookings = await Booking.find({});
  res.json(bookings);
});

bookingRouter.post("/bookings", async (req, res) => {
  const booking = new Booking({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    people: req.body.people,
    nights: req.body.nights,
    dates: req.body.dates,
    roomId: req.body.roomId,
  });
  const result = await booking.save();
  return res.status(201).json(result);
});

bookingRouter.put("/bookings/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  await Booking.findByIdAndUpdate(id, body);
  return res.status(204).json(req.body);
});

bookingRouter.delete("/bookings/:id", async (req, res) => {
  const id = req.params.id;
  await Booking.findByIdAndDelete(id);
  return res.status(204).json(req.body);
});

module.exports = bookingRouter;
