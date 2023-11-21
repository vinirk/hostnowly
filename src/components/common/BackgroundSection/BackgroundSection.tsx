import React, { FC } from "react";

export interface BackgroundSectionProps {
  className?: string;
  children?: React.ReactNode;
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
  className = "bg-neutral-100 dark:bg-black dark:bg-opacity-20 ",
  children,
}) => {
  return (
    <div
      className={`relative w-screen p-10 xl:max-w-[1240px] left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default BackgroundSection;
