const express = require("express");
const Month = require("../models/month");
const monthRouter = express.Router();

monthRouter.get("/cal", async (req, res) => {
  const months = await Month.find({});
  return res.status(200).json(months);
});

monthRouter.get("/cal/:yr/:mon", async (req, res) => {
  const yr = req.params.yr;
  let mon = req.params.mon;
  const month = await Month.findOne({ name_lower: mon, year: yr });
  return res.status(200).json(month);
});

monthRouter.post("/cal", async (req, res) => {
  const check = await Month.exists({
    name_lower: req.body.name,
    year: req.body.year,
  });
  if (check === null) {
    const lc = req.body.name.toLowerCase();
    const month = new Month({
      name: req.body.name,
      name_lower: lc,
      year: req.body.year,
      bookings: req.body.maxOccupants,
    });
    const result = await month.save();
    return res.status(201).json(result);
  } else {
    return res.status(409).json("This month already exists.");
  }
});

monthRouter.put("/cal/:yr/:mon", async (req, res) => {
  const yr = req.params.yr;
  const mon = req.params.mon;
  let month = await Month.findOne({ name_lower: mon, year: yr });
  month.bookings.push(req.body.bookings);
  await month.save();
  return res.status(204).json(month);
});
/*
roomRouter.delete('/rooms/:id', async (req, res) => {
  const id = req.params.id
  await Room.findByIdAndDelete(id);
  return res.status(204).json(req.body); 
})
*/
module.exports = monthRouter;
