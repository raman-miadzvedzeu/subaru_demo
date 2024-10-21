import { FC } from "react";

interface ProgressProps {
  step: number;
  totalSteps: number;
}

export const Progress: FC<ProgressProps> = ({ step, totalSteps }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const currentStep = index + 1;
          const isActive = currentStep === step;
          return (
            <div
              key={`step-${currentStep}`}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                isActive ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {currentStep}
            </div>
          );
        })}
      </div>
    </div>
  );
};
