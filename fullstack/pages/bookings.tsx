import React from "react";
import BookingForm from "./components/BookingForm/BookingForm";

function Bookings() {
  return (
    <div>
      <BookingForm
        room={undefined}
        user={{
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          roomDetails: "",
          roomPrice: 0,
          date: "",
          salary: "",
        }}
        onSubmit={function (user: {
          firstName: string;
          lastName: string;
          email: string;
          address: string;
          date: string;
          roomDetails: string;
          roomPrice: number;
          salary: string;
        }): void {
          throw new Error("Func not implemented.");
        }}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default Bookings;
