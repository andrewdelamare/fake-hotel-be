Back End for Fake Hotel

Express
Mongoose

This backend handles
  -Room bookings
Later will handle
  -Users 

Methods:
  .get(/bookings/month) -> bookings by month
  .get(/bookings/month/room) -> bookings by month for room
  .get(/rooms) -> rooms 
  .get(/room) -> room
  .post(/room/book) -> book room

Schemas:
  booking -> room id, dates array, user id (later) , id
  room ->  name string, maxOccupants number, beds number, description string, bookings array, id
  