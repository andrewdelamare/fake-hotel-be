const express = require("express");
const Room = require("../models/room");
const roomRouter = express.Router();

roomRouter.get("/rooms", async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
});

roomRouter.get("/rooms/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const room = await Room.findById(id);
  res.json(room);
});

roomRouter.post("/rooms", async (req, res) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    maxOccupants: req.body.maxOccupants,
    beds: req.body.beds,
  });
  const result = await room.save();
  return res.status(201).json(result);
});

roomRouter.put("/rooms/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const body = req.body;
  await Room.findOneAndUpdate(id, body);
  return res.status(204).json(req.body);
});

roomRouter.put("/rooms/:id/booking", async (req, res) => {
  const id = { _id: req.params.id };
  const body = req.body;
  const result = await Room.findOneAndUpdate(id, body);
  return res.status(204).json(result);
});

roomRouter.delete("/rooms/:id", async (req, res) => {
  const id = req.params.id;
  await Room.findByIdAndDelete(id);
  return res.status(204).json(req.body);
});

module.exports = roomRouter;
