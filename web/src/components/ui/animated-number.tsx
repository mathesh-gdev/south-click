"use client";

import * as React from "react";
import { motion, useSpring, useTransform } from "motion/react";

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  format = (val: number) => Math.round(val).toLocaleString("en-IN"),
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: (val: number) => string;
}) {
  const spring = useSpring(0, {
    stiffness: 85,
    damping: 18,
    mass: 0.8,
  });

  const display = useTransform(spring, (current) =>
    `${prefix}${format(current)}${suffix}`
  );

  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className="tabular-nums font-bold">{display}</motion.span>;
}
