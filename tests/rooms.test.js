const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const roomRouter = require("../controllers/rooms");
const Room = require("../models/room");

const api = supertest(app);

const initialRooms = [
  {
    name: "Small room",
    description: "A small room for one person. One single bed, chair, tv, and mini fridge.",
    maxOccupants: 1,
    beds: 1
},
{
  name: "Normal room",
  description: "A normal room for one to two people. One double bed, couch, tv, and mini fridge.",
  maxOccupants: 4,
  beds: 2
},
{
  name: "Large room",
  description: "A large room for two to four people. Two double beds, couch, tv, and mini fridge.",
  maxOccupants: 4,
  beds: 2
},
{
  name: "Huge room",
  description: "A massive room for two to four people. One single king size bed, couch bed, tv, and mini fridge.",
  maxOccupants: 4,
  beds: 2
}
]

beforeEach(async () => {
  await Room.deleteMany();
  let roomObj = new Room(initialRooms[0]);
  await roomObj.save();
  roomObj = new Room(initialRooms[1]);
  await roomObj.save();
  roomObj = new Room(initialRooms[2]);
  await roomObj.save();
  roomObj = new Room(initialRooms[3]);
  await roomObj.save();
}, 100000)

test('all rooms returned', async () => {
  const response = await api.get('/rooms');
  expect(response.body).toHaveLength(initialRooms.length);
})

afterAll(() => {
  mongoose.connection.close()
})