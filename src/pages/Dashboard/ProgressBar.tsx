import classnames from "classnames";
import { useEffect, useState } from "react";

const ProgressBar = ({ value }: { value: number }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  });

  return (
    <div
      className={classnames(
        "w-full h-10 p-2  border-stone-50",
        value < 14
          ? "border rounded-full"
          : "border-l border-t border-b rounded-tl-full rounded-bl-full"
      )}
    >
      <div
        style={{ width: show ? `${(value / 14) * 100}%` : "0%" }}
        className={classnames(
          "h-full rounded-full",
          value > 14 ? "bg-red-500" : "bg-orange-200",
          "transition-width duration-1000 ease-in-out"
        )}
      ></div>
    </div>
  );
};

export default ProgressBar;
