// components/RoomCard.test.tsx
import { render } from "@testing-library/react";
import RoomCard from "../pages/components/RoomCard/page";
import room from "../__mocks__/RoomCard.mock";

describe("RoomCard", () => {
  it("renders correctly", () => {
    const { getByText } = render(<RoomCard room={room} />);

    expect(getByText("Bosco")).toBeInTheDocument();
    expect(getByText("Bedrooms: 3")).toBeInTheDocument();
    expect(getByText("Price: $ 219429")).toBeInTheDocument();
    expect(getByText("Duration: 14 Months ")).toBeInTheDocument();
    expect(getByText("Unit Sqft: 461 sqft")).toBeInTheDocument();
    expect(getByText("Available: 2024-02-12")).toBeInTheDocument();
  });
});