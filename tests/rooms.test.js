const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const roomRouter = require("../controllers/rooms");
const Room = require("../models/room");

const api = supertest(app);

const initialRooms = [
  {
    _id: "62910b0acb70612be56c67a2",
    name: "Small room",
    description:
      "A small room for one person. One single bed, chair, tv, and mini fridge.",
    maxOccupants: 1,
    beds: 1,
  },
  {
    _id: "62910b0acb70612be56c67a4",
    name: "Normal room",
    description:
      "A normal room for one to two people. One double bed, couch, tv, and mini fridge.",
    maxOccupants: 4,
    beds: 2,
  },
  {
    _id: "62910b0acb70612be56c67a6",
    name: "Large room",
    description:
      "A large room for two to four people. Two double beds, couch, tv, and mini fridge.",
    maxOccupants: 4,
    beds: 2,
  },
  {
    _id: "62910b0acb70612be56c67a8",
    name: "Huge room",
    description:
      "A massive room for two to four people. One single king size bed, couch bed, tv, and mini fridge.",
    maxOccupants: 4,
    beds: 2,
  },
];

const newRoom = {
  name: "Executive Suite",
  description:
    "A large room for two to four people. One premium king size bed, premium couch bed, premium tv, and mini fridge. Premium furniture, bedding, bathroom and views.",
  maxOccupants: 4,
  beds: 2,
};

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
}, 100000);

test("all rooms returned", async () => {
  const response = await api.get("/rooms");
  expect(response.body).toHaveLength(initialRooms.length);
});

test("room added", async () => {
  const body = newRoom;
  const response = await api.post("/rooms").send(body);
  expect(response.status).toBe(201);
  const updated = await api.get("/rooms");
  expect(updated.body[4].maxOccupants).toBe(4);
  expect(updated.body[4].beds).toBe(2);
  expect(updated.body[4].name).toBe("Executive Suite");
}, 10000);

test("room updated", async () => {
  const body = {
    description:
      "A massive room for two to six people. Two single king size beds, couch bed, premium tv, and mini fridge.",
    maxOccupants: 6,
    beds: 3,
  };
  const response = await api.put("/rooms/62910b0acb70612be56c67a8").send(body);
  expect(response.status).toBe(204);
  const updated = await api.get("/rooms");
  expect(updated.body[3].maxOccupants).toBe(6);
  expect(updated.body[3].beds).toBe(3);
}, 10000);

test("room deleted", async () => {
  const body = {};
  const response = await api
    .delete("/rooms/62910b0acb70612be56c67a2")
    .send(body);
  expect(response.status).toBe(204);
  const updated = await api.get("/rooms");
  expect(updated.body).toHaveLength(3);
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
