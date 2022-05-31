# Back End for Fake Hotel
[![Tests](https://github.com/andrewdelamare/fake-hotel-be/actions/workflows/node.js.yml/badge.svg)](https://github.com/andrewdelamare/fake-hotel-be/actions/workflows/node.js.yml)
## This backend handles
- Room bookings
- Room cancelations

## Later it will handle
- User creation & deletion 
- Secure login 
- Restrict bookings and cancelations to logged in users

---
## Document Schemas
### Booking
```javascript
  name: String,
  people: Number,
  nights: Number,
  dates: [String],
  month: String,
  roomId: String,
  status: String,
```
### Room
```javascript
  name: String,
  description: String,
  maxOccupants: Number,
  beds: Number,
  bookings: [String]
```
### Month 
```javascript
  name: String,
  year: Number,
  bookings: [String]
```
---