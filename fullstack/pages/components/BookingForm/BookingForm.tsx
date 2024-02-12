// components/BookingForm.tsx

import Stepper from "../Stepper/Stepper";

import { useState } from "react";
import { useRouter } from "next/router";
import { DocusealForm } from "@docuseal/react";

import { FormState, Errors } from "@/pages/types";

export interface RoomInfo {
  id: number;
  title: string;
  location: string;
  pricing: {
    monthlyPricing: {
      amount: number;
    };
  };
  price: number;
  availableDate: string;
  images: string[];
}

export interface BookingFormProps {
  room: RoomInfo;
  user: {
    firstName: string;
    lastName: string;
    salary: string;
    email: string;
    address: string;
    roomDetails: string;
    roomPrice: number;
    date: string;
  };
  onSubmit: (user: {
    firstName: string;
    lastName: string;
    salary: string;
    email: string;
    address: string;
    roomDetails: string;
    roomPrice: number;
    date: string;
  }) => void;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  room,
  onSubmit,
  onBack,
}) => {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    salary: "",
    roomDetails: "",
    roomPrice: 0,
    date: "",
    confirmFirstName: "",
    confirmLastName: "",
    confirmEmail: "",
    confirmAddress: "",
    confirmSalary: "",
    confirmRoomDetails: "",
    confirmRoomPrice: 0,
    confirmDate: "",

    signed: false,
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    salary: "",
    roomDetails: "",
    roomPrice: "",
    date: "",
  });

  const validateForm = () => {
    const newErrors: any = {};
    if (!formState.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formState.salary.trim()) {
      newErrors.salary = "Salary is required";
    }
    if (!formState.roomDetails.trim()) {
      newErrors.roomDetails = "Room Details is required";
    }
    if (!formState.roomPrice) {
      newErrors.roomPrice = "Price is required";
    }
    if (!formState.date.trim()) {
      newErrors.date = "Date is required";
    }
    if (!formState.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formState.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setFormState({ ...formState, signed: true });
      console.log("Form submitted:", formState);
    }
  };

  const submitDocuseal = (data: any) => {
    console.log(data);
    console.log("starting docuseal submission");
    const formDataString = encodeURIComponent(JSON.stringify(formState));
    const url = `/success?formData=${formDataString}`;
    router.push(url, undefined, { shallow: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  const {
    firstName,
    lastName,
    email,
    salary,
    address,
    signed,
    roomDetails,
    roomPrice,
    date,
    confirmFirstName,
    confirmLastName,
    confirmSalary,
    confirmRoomDetails,
    confirmRoomPrice,
    confirmDate,
    confirmEmail,
    confirmAddress,
  } = formState;

  const formData = {
    firstName,
    lastName,
    salary,
    email,
    address,
    confirmFirstName,
    confirmLastName,
    confirmSalary,
    signed,
    roomDetails,
    roomPrice,
    date,
    confirmRoomDetails,
    confirmRoomPrice,
    confirmDate,
    confirmEmail,
    confirmAddress,

    timestamp: new Date().toISOString(),
  };
  // function is left here for open discussion if the docuseal open source library wasnt used.
  //   const handleSignatureComplete = async (signature: boolean) => {
  //     formData.signed = signature;
  //     console.log("Form data with signature:", formData);

  //     try {
  //     //   await axios.post("https://mock-api.com/submit", formData);
  //     //   console.log("Form submitted to mock API");
  //     //   router.push("/success");
  //     console.log("formSubmitted")
  //     } catch (error) {
  //       console.error("Error submitting form to mock API:", error);
  //     }
  //   };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <Stepper>
        <div>
          <h2 className="text-2xl font-medium mb-4">Personal Information</h2>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.email}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.salary}
              onChange={handleInputChange}
            />
            {errors.salary && (
              <p className="text-red-500 mt-1">{errors.salary}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <p className="text-red-500 mt-1">{errors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Room Details
            </label>
            <input
              type="text"
              id="roomDetails"
              name="roomDetails"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.roomDetails}
              onChange={handleInputChange}
            />
            {errors.roomDetails && (
              <p className="text-red-500 mt-1">{errors.roomDetails}</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-4">Confirm Information</h2>
          <div className="mb-4">
            <label
              htmlFor="confirmFirstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white1"
            >
              Confirm First Name
            </label>
            <input
              type="text"
              id="confirmFirstName"
              name="confirmFirstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.firstName}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmLastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Last Name
            </label>
            <input
              type="text"
              id="confirmLastName"
              name="confirmLastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.lastName}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmSalary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Salary
            </label>
            <input
              type="text"
              id="confirmSalary"
              name="confirmSalary"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.salary}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmAddress"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Address
            </label>
            <input
              type="text"
              id="confirmAddress"
              name="confirmAddress"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.address}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmRoomDetails"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Room Details
            </label>
            <input
              type="text"
              id="confirmRoomDetails"
              name="confirmRoomDetails"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.roomDetails}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="roomPrice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Room Price
            </label>
            <input
              type="text"
              id="confirmRoomPrice"
              name="confirmRoomPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formState.roomPrice}
              onChange={handleInputChange}
              readOnly
            />
          </div>
        </div>
        {
          <DocusealForm
            src="https://docuseal.co/d/w1KV9sCkxyr6w3"
            email={formState.email}
            onComplete={submitDocuseal}
          />
        }
      </Stepper>
    </form>
  );
};

export default BookingForm;
