import { expirationDate } from "@/constants";
import { FC } from "react";

interface UpgradeOptionProps {
  selected: boolean;
  name: string;
  price: string;
  onClick: () => void;
}



export const UpgradeOption: FC<UpgradeOptionProps> = ({
  selected,
  name,
  price,
  onClick,
}) => {
  return (
    <div
      className="flex-1 bg-gray-100 p-4 rounded-md border border-blue-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          className="form-checkbox w-5 h-5 mr-2"
          checked={selected}
          readOnly
        />
        <div>
          <p className="text-lg font-semibold text-gray-600">{name}</p>
          <p className="text-xs text-gray-500">
            Renewal Date {expirationDate}
          </p>
        </div>
      </div>
      <p className="text-2xl font-bold mb-2 text-gray-700">{price}</p>
      {/* <p className="text-sm text-gray-600">Includes a Free 6 Month Trial</p> */}
    </div>
  );
};
