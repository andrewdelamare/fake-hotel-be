const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bookingRouter = require("../controllers/bookings");
const Booking = require("../models/booking");

const api = supertest(app);

const initialBookings = [
  {
    name: "Fakely Personson",
    people: 2,
    nights: 2,
    dates: [
        "2022-05-26T21:00:00.000Z",
        "2022-05-27T21:00:00.000Z"
    ],
    roomId: "628dea266a640412fa02be1d",
},
{
  name: "Unknowen Wherdhebe",
  people: 2,
  nights: 1,
  dates: [
      "2022-05-28T21:00:00.000Z",
  ],
  roomId: "628dea266a640412fa02be1d",
},
{
  name: "Whoen MacFakley",
  people: 2,
  nights: 2,
  dates: [
      "2022-05-29T21:00:00.000Z",
      "2022-05-30T21:00:00.000Z"
  ],
  roomId: "628dea266a640412fa02be1d",
},
{
  name: "Nowen Smith",
  people: 4,
  nights: 1,
  dates: [
      "2022-05-31T21:00:00.000Z",
  ],
  roomId: "628dea266a640412fa02be1d",
},
]

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

test('all rooms returned', async () => {
  const response = await api.get('/bookings');
  expect(response.body).toHaveLength(initialBookings.length);
})

afterAll(() => {
  mongoose.connection.close()
})