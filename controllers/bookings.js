const express = require('express');
const Booking = require('../models/booking');
const bookingRouter = express.Router();

bookingRouter.get('/bookings', async (req, res) => {
  const bookings = await Booking.find({});
  res.json(bookings) 
})

bookingRouter.post('/bookings', async (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    people: req.body.people,
    nights: req.body.nights,
    dates: req.body.dates,
    roomId: req.body.roomId,
  });
  const result = await booking.save();
  return res.status(201).json(result); 
})

module.exports = bookingRouter;