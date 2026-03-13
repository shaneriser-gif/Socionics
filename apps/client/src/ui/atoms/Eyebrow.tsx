import type { ReactNode } from "react";
import { classNames } from "../../shared/utils/classNames";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className }: EyebrowProps) {
  return <div className={classNames(styles.root, className)}>{children}</div>;
}
