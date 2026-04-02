import type { ReactNode } from "react";
import { classNames } from "../../shared/utils/classNames";
import styles from "./Heading.module.css";

type HeadingSize = "md" | "lg";

type HeadingProps = {
  children: ReactNode;
  size?: HeadingSize;
  className?: string;
};

export default function Heading({
  children,
  size = "md",
  className,
}: HeadingProps) {
  return (
    <div className={classNames(styles.root, styles[size], className)}>
      {children}
    </div>
  );
}
