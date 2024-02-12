import React, { useState } from "react";

interface StepperProps {
  children: React.ReactNode;
}

const Stepper: React.FC<StepperProps> = ({ children }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) =>
      Math.min(prevStep + 1, React.Children.count(children) - 1)
    );
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div>
      {React.Children.toArray(children)[step]}
      <div className="flex justify-between mt-4">
        {/* Show Previous button on all steps except the first step */}
        {step > 0 && (
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {/* Show Next button on all steps except the last step */}
        {step < React.Children.count(children) - 1 && (
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={nextStep}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
