import { FC } from "react";

export interface BadgeProps {
  className?: string;
  text?: string;
}

const Badge: FC<BadgeProps> = ({ className = "", text = "-50% OFF" }) => {
  return (
    <div
      className={`text-xs py-0.5 px-3 font-medium rounded-full ${className}`}
    >
      {text}
    </div>
  );
};

export default Badge;
