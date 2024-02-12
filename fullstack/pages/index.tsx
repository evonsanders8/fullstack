// pages/index.tsx
import { GetServerSideProps } from "next";
import { Room } from "../pages/types";
import RoomCard from "./components/RoomCard/page";
import Link from "next/link";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useEffect } from "react";

interface HomeProps {
  rooms: Room[] | null;
}

const Home: React.FC<HomeProps> = ({ rooms }) => {
  const [currentCity, setCurrentCity] = useState("");
  const [roomsData, setRooms] = useState<Room[] | null>(rooms);

  const handleCityChange = async (city: string) => {
    const res = await fetch(
      `https://www.common.com/cmn-api/listings/common?city=${city}`
    );
    const rooms = await res.json();

    const roomsWithFirstImage = rooms.map((room: any) => {
      return {
        ...room,
        images: room.images.length > 0 ? [room.images[0]] : [],
      };
    });

    setRooms(roomsWithFirstImage);
  };

  useEffect(() => {
    if (currentCity) {
      handleCityChange(currentCity);
    }
  }, [currentCity]);

  if (!rooms) {
    return <div>No rooms available</div>;
  }

  return (
    <div>
      <div className="max-w-md text-center">
        <div className="text-center">
          <h1 className=" flex items-center text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {" "}
            Please Select Your City{" "}
          </h1>
        </div>
        <select
          id="city"
          name="city"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={currentCity}
          onChange={(e: { target: { value: string } }) =>
            setCurrentCity(e.target.value.toLowerCase())
          }
        >
          <option value="">Select a city</option>
          <option value="new-york-city">New York City</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
          {/* Add more cities here */}
        </select>
      </div>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-medium mb-6">Available Rooms</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomsData.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch("https://www.common.com/cmn-api/listings/common");
  const rooms = await res.json();

  const roomsWithFirstImage = rooms.map((room: any) => {
    return {
      ...room,
      images: room.images.length > 0 ? [room.images[0]] : [],
    };
  });

  return {
    props: {
      rooms: roomsWithFirstImage,
    },
  };
};

export default Home;
