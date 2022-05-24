//.get(/rooms) -> rooms 
//.get(/room) -> room
//.post(/room/book) -> book room

import express from 'express';
import { Room } from '../models/room';
export const roomRouter = express.Router();

router.get('/rooms', async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms) 
})