export interface Room {
  id: number;
  marketingName: string;
  location: string;
  bedrooms: number;
  availableDate: string;
  images: string[];
  address: Address;
  unitSqft: number;
  pricing: Pricing;

}
export interface Address {
  fullAddress: string;
  roomNumber: string;
  city: string;
  postalCode: string;
  countryCode: string;
}
export interface Pricing {
  monthlyPricing: MonthlyPricing;
}
export interface MonthlyPricing {
  [x: string]: any;
  name: string;
  months: number;
  amount: number;
}
export interface RoomInfo {
  room: Room;
}

export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  salary: string;
  roomDetails: string;
  roomPrice: number;
  date: string;
  confirmFirstName: string;
  confirmLastName: string;
  confirmEmail: string;
  confirmAddress: string;
  confirmSalary: string;
  confirmRoomDetails: string;
  confirmRoomPrice: number;
  confirmDate: string;
  signed: boolean;
}

export interface Errors {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  salary: string;
  roomDetails: string;
  roomPrice: string;
  date: string;
}
