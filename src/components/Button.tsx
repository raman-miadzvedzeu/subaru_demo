import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({ variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={`${
        variant === "primary"
          ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          : "bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
      } cursor-pointer ${props.className}`}
    ></button>
  );
};
