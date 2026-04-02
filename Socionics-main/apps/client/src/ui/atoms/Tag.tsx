import type { ReactNode } from "react";
import { classNames } from "../../shared/utils/classNames";
import styles from "./Tag.module.css";

type TagProps = {
  children: ReactNode;
  glow?: boolean;
  className?: string;
};

export default function Tag({ children, glow, className }: TagProps) {
  return (
    <span className={classNames(styles.root, glow && styles.glow, className)}>
      {children}
    </span>
  );
}
