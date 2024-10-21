import { FC } from "react";

export const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input {...props} className="border rounded-md px-4 py-2" />;
};
