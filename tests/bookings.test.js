const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bookingRouter = require("../controllers/bookings");
const Booking = require("../models/booking");

const api = supertest(app);

const initialBookings = [
  {
    _id: "628f5ac53794dcb51e648a04",
    name: "Fakely Personson",
    people: 2,
    nights: 2,
    dates: [
        "2022-05-26T21:00:00.000Z",
        "2022-05-27T21:00:00.000Z"
    ],
    status: "CheckedOut",
    roomId: "628dea266a640412fa02be1d",
  },
  {
    _id: "628f5ac53794dcb51e648a06",
    name: "Unknowen Wherdhebe",
    people: 2,
    nights: 1,
    dates: [
        "2022-05-28T21:00:00.000Z",
    ],
    status: "CheckedIn",
    roomId: "628dea266a640412fa02be1d",
  },
  {
    _id: "628f5ac53794dcb51e648a08",
    name: "Whoen MacFakley",
    people: 2,
    nights: 2,
    dates: [
        "2022-05-29T21:00:00.000Z",
        "2022-05-30T21:00:00.000Z"
    ],
    status: "Paid",
    roomId: "628dea266a640412fa02be1d",
  },
  {
    _id: "628f5ac53794dcb51e648a0a",
    name: "Nowen Smith",
    people: 4,
    nights: 1,
    dates: [
        "2022-05-31T21:00:00.000Z",
    ],
    status: "Reserved",
    roomId: "628dea266a640412fa02be1d",
  },
];

const newBooking = {
  name: "Pamela Poovy",
  people: 4,
  nights: 1,
  dates: [
      "2022-06-05T21:00:00.000Z",
  ],
  status: "Reserved",
  roomId: "628dea266a640412fa02be1d",
};

beforeEach(async () => {
  await Booking.deleteMany();
  let roomObj = new Booking(initialBookings[0]);
  await roomObj.save();
  roomObj = new Booking(initialBookings[1]);
  await roomObj.save();
  roomObj = new Booking(initialBookings[2]);
  await roomObj.save();
  roomObj = new Booking(initialBookings[3]);
  await roomObj.save();
}, 100000)

test('all bookings returned', async () => {
  const response = await api.get('/bookings');
  expect(response.body).toHaveLength(initialBookings.length);
})

test('booking added', async () => {
  const body = newBooking;
  const response = await api.post('/bookings').send(body);
  expect(response.status).toBe(201);
  const updated = await api.get('/bookings');
  expect(updated.body).toHaveLength(5);
  expect(updated.body[4].name).toBe("Pamela Poovy");
}, 10000);

test('booking updated', async () => {
  const body = {"name": "Owen McFakely"}
  const response = await api.put('/bookings/628f5ac53794dcb51e648a08').send(body);
  expect(response.status).toBe(204);
}, 10000);

test('booking deleted', async () => {
  const body = {}
  const response = await api.delete('/bookings/628f5ac53794dcb51e648a08').send(body);
  expect(response.status).toBe(204);
  const updated = await api.get('/bookings');
  expect(updated.body).toHaveLength(3)
}, 10000);

afterAll(() => {
  mongoose.connection.close()
})