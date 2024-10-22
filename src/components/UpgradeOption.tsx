import { expirationDate } from "@/constants";
import { FC } from "react";

interface UpgradeOptionProps {
  selected: boolean;
  name: string;
  price: string;
  size: "large" | "small";
  onClick: () => void;
}


const largeClasses = {
  header: "text-lg",
  body: "p-4",
  price: "text-2xl",
}

const smallClasses = {
  header: "text-md",
  body: "max-w-[300px] p-2",
  price: "text-md",
}

export const UpgradeOption: FC<UpgradeOptionProps> = ({
  selected,
  name,
  price,
  onClick,
  size = "large",
}) => {
  const classes = size === "large" ? largeClasses : smallClasses;
  return (
    <div
      className={`flex-1 bg-gray-100 ${classes.body} rounded-md border cursor-pointer ${selected && "border-blue-500"}`}
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
          <p className={`${classes.header} font-semibold text-gray-600`}>{name}</p>
          <p className="text-xs text-gray-500">
            Renewal Date {expirationDate}
          </p>
        </div>
      </div>
      <p className={`${classes.price} font-bold mb-2 text-gray-700`}>{price}</p>
      {/* <p className="text-sm text-gray-600">Includes a Free 6 Month Trial</p> */}
    </div>
  );
};
