/* eslint-disable @next/next/no-img-element */
// components/RoomCard.tsx (updated)

import { Room } from "../../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingForm, { RoomInfo } from "../BookingForm/BookingForm";
import { useUserContext } from "@/utils/UserContext";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const router = useRouter();
  const [bookingStep, setBookingStep] = useState(0);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    salary: "",
    roomDetails: "",
    roomPrice: 0,
    date: "",
  });

  const handleBooking = () => {
    setBookingStep(1);
  };

  const handleBack = () => {
    setBookingStep(0);
  };

  const handleSubmit = (user: {
    firstName: string;
    lastName: string;
    salary: string;
    email: string;
    address: string;
    roomDetails: string;
    roomPrice: number;
    date: string;
  }) => {
    setUser(user);
    router.push("/success");
  };
  const roomInfo: RoomInfo = {
    id: room.id,

    location: room.location,
    pricing: {
      monthlyPricing: {
        amount: room.pricing.monthlyPricing.map((item: any) => {
          Object.keys(item);
        }),
      },
    },
    availableDate: room.availableDate,
    images: room.images.map((item) => Object.keys(item)[0]),
    title: "",
    price: 0,
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-gray-100 transition duration-300"
      key={room.id}
    >
      <div className="flex justify-center mb-4">
        <img
          src={room.images[0].url}
          alt={room.marketingName}
          className="w-64 h-48 object-cover rounded-lg"
        />
      </div>

      <div className="text-center mb-4">
        <h5 className="text-2xl font-semibold mb-1">{room.marketingName}</h5>

        <p className="text-gray-500 mb-2">Bedrooms: {room.bedrooms} </p>
        <p className="text-gray-500 mb-2">
          Price: $ {Object.values(room.pricing.monthlyPricing)[0].amount}{" "}
        </p>
        <p className="text-gray-500 mb-2">
          Duration: {Object.values(room.pricing.monthlyPricing)[0].name}{" "}
        </p>
        <p className="text-gray-500 mb-2"> Unit Sqft: {room.unitSqft} sqft</p>
        <p className="text-gray-500">Available: {room.availableDate}</p>
      </div>
      <div className="text-right">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => {
            router.push("/bookings");
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
