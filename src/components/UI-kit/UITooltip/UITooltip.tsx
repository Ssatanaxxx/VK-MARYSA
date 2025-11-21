"use client";

import React, { ReactElement, useRef, useState } from "react";
import styles from "./UITooltip.module.css";

interface UITooltipProps {
  children: ReactElement<{
    onBlur?: () => void;
    onFocus?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }>;

  isAuthenticated?: boolean;
}

export const UITooltip = ({ children, isAuthenticated }: UITooltipProps) => {
  const [isTooltip, setIsTooltip] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const hideTooltip = () => {
    timeout.current = setTimeout(() => {
      setIsTooltip(false);
    }, 300);
  };

  const showTooltip = () => {
    timeout.current = setTimeout(() => {
      setIsTooltip(true);
    }, 300);
  };
  const enchantedChild = React.cloneElement(children, {
    onBlur: hideTooltip,
    onFocus: showTooltip,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
  });

  return (
    <div className={styles.tooltip__container}>
      {enchantedChild}
      {!isAuthenticated && isTooltip && (
        <div className={styles.tooltip}>
          <h3 className={styles.tooltip__title}>
            Войдите, чтобы сохранять фильмы в избранные
          </h3>
        </div>
      )}
    </div>
  );
};

export default UITooltip;
