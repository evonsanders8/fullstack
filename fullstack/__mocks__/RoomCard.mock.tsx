// __mocks__/RoomCard.mock.tsx
import { Room } from "../pages/types";

const room: Room = {
  id: 1,
  marketingName: "Beautiful 2 Bedroom Apartment",
  bedrooms: 2,
  unitSqft: 1200,
  address: {
    fullAddress: '123 Sesame Street',
    roomNumber: '2301-A',
    city: 'New York',
    postalCode: '70899',
    countryCode: 'USA',
  },
  pricing: {
    monthlyPricing: {
        name: "",
        months: 0,
        amount: 0
    }
    },
  availableDate: "2022-01-01",
  images: ["https://via.placeholder.com/150"],

  location: "New York, NY",

};

export default room;