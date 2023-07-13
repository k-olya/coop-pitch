import { HTMLAttributes, forwardRef } from "react";
import c from "classnames";

export const Button = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={c(
      "cursor-pointer bg-black bg-opacity-50 active:bg-white active:bg-opacity-25 rounded-lg text-center text-white",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
