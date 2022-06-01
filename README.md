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
## Want to run it locally?
1. Clone fake-hotel-be
2. Create .env file and assign values to:  

   (the port you want to run the server on)
   ````
   PORT=3003 
   ````
   (the url of your mongodb cluster) 
   ````
   MONGODB_URI="mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]" 
   
   ````
   (the url of your mongodb cluster for testing)  
   ````
   TEST_URI="mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]"
   ````   
3. Inside fake-hotel-be run:
   ````
   npm install
   npm run
   ````

   If you want to test your clone, simply run: 
   ````
   npm test
   ````
***
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