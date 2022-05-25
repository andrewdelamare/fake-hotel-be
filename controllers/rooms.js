//.get(/rooms) -> rooms 
//.get(/room) -> room
//.post(/room/book) -> book room

const express = require('express');
const Room = require('../models/room');
const roomRouter = express.Router();

roomRouter.get('/rooms', async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms) 
})

roomRouter.post('/rooms', async (req, res) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    maxOccupants: req.body.maxOccupants,
    beds: req.body.beds,
  });
  const result = await room.save();
  return res.status(201).json(result); 
})

module.exports = roomRouter;