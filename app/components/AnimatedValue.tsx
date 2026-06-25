"use client";

import { useEffect, useState } from "react";

type AnimatedValueProps = {
  value: number;
};

export default function AnimatedValue({ value }: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const counter = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplayValue(value);
        clearInterval(counter);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span>
      £{displayValue.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}