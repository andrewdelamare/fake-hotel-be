const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const monthRouter = require("../controllers/months");
const Month = require("../models/month");

const api = supertest(app);

const initialMonths = [
  {
    name: "June",
    name_lower: "june",
    year: 2022,
    bookings: [],
  },
  {
    name: "July",
    name_lower: "july",
    year: 2022,
    bookings: [
      "12341234klj12342lj2342",
      "42341klj234kjh234kj234",
      "12345234523lkjlkj234lkj234",
    ],
  },
  {
    name: "August",
    name_lower: "august",
    year: 2022,
    bookings: [],
  },
  {
    name: "September",
    name_lower: "september",
    year: 2022,
    bookings: [],
  },
];

beforeEach(async () => {
  await Month.deleteMany();
  let monthObj = new Month(initialMonths[0]);
  await monthObj.save();
  monthObj = new Month(initialMonths[1]);
  await monthObj.save();
  monthObj = new Month(initialMonths[2]);
  await monthObj.save();
  monthObj = new Month(initialMonths[3]);
  await monthObj.save();
}, 100000);

test("all months returned", async () => {
  const response = await api.get("/cal");
  expect(response.body).toHaveLength(4);
});

test("specific month returned", async () => {
  const response = await api.get("/cal/2022/july");
  expect(response.body.name).toBe("July");
  expect(response.body.bookings).toHaveLength(3);
});

test("month added", async () => {
  const body = { name: "October", year: 2022, bookings: [] };
  const response = await api.post("/cal").send(body);
  expect(response.status).toBe(201);
  const updated = await api.get("/cal");
  expect(updated.body).toHaveLength(5);
}, 10000);

test("month updated", async () => {
  const body = { bookings: "abc123def456" };
  const response = await api.put("/cal/2022/june").send(body);
  expect(response.status).toBe(204);
  const updated = await api.get("/cal/2022/june");
  expect(updated.body.bookings[0]).toBe("abc123def456");
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
